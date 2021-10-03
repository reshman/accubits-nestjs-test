import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { parse } from '@fast-csv/parse';
import { ClientProxy } from '@nestjs/microservices';
import { EmailService } from 'src/email/email.service';
import { Logs } from './logs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QueueService {
  constructor(
    @Inject('EMAIL_SERVICE') private readonly client: ClientProxy,
    @Inject('PARKING_LOT_QUEUE') private readonly parkingLotClient: ClientProxy,
    @InjectRepository(Logs) private readonly logRepository: Repository<Logs>,
    private readonly email: EmailService,
  ) {}

  /**
   * upload csv and emit data to RMQ
   * @param req
   * @param file
   * @returns
   */
  async uploadCSV(req, file) {
    if (!req.mimeTypeValidation) {
      throw new HttpException(
        { error: 'Please upload a CSV file' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const rows = [file.buffer.toString()];
    await this.client.connect();

    const stream = parse({ headers: true })
      .on('error', (error) => {
        throw new HttpException(
          { error: 'Upload file err!' },
          HttpStatus.BAD_REQUEST,
        );
      })
      .on('data', (row) => {
        //console.log(row)
        this.client.emit('email_job_queue', row);
      })
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`));

    rows.forEach((row) => {
      stream.write(row);
    });
    stream.end();

    return {
      data: {},
      message: 'Newsletter uploaded Sucessfully',
      statusCode: HttpStatus.CREATED,
    };
  }

  async emailQueueJob(data: any) {
    try {
      console.log(data);
      const sendMail = await this.email.sendMail(data);

      if (sendMail.accepted.length == 0) {
        this.parkingLotClient.emit('parkinglot_message', data);
        return;
      }

      await this.logRepository.save({
        newslettername: data.newsletterName,
        email: data.email,
      });
    } catch (error) {
      console.log('queue error' + error);
      this.parkingLotClient.emit('parkinglot_message', data);
    }
  }
}
