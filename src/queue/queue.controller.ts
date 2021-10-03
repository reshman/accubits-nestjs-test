import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileValidator } from './queue.filevalidation';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(
    private readonly queueService: QueueService, //@Inject('EMAIL_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Post('newletter-csv')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileValidator,
    }),
  )
  async uploadNewsletterCSV(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.queueService.uploadCSV(req, file);
  }

  @EventPattern('email_job_queue')
  async emailJobQueue(data) {
    return this.queueService.emailQueueJob(data);
  }

  @EventPattern('parkinglot_message')
  async parkinglotMessage(data) {
    console.log(`Email not sent to ${data.email}`);
  }
}
