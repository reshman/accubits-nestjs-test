import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: configService.get('MAIL_HOST'),
      port: configService.get('MAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: configService.get('MAIL_USER'), // generated ethereal user
        pass: configService.get('MAIL_PASSWORD'), // generated ethereal password
      },
    });
  }

  async sendMail(mailOptions) {
    const info = await this.transporter.sendMail({
      from: '"Reshman Suresh 👻" <admin@example.com>', // sender address
      to: mailOptions.email, // list of receivers
      subject: mailOptions.newsletterName + '✔', // Subject line
      text: mailOptions.newsletterContent, // plain text body
      html: '<b>' + mailOptions.newsletterContent + '</b>', // html body
    });
    return info;
  }
}
