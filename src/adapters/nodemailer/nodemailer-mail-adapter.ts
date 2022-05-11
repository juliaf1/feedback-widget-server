import nodemailer from 'nodemailer';
import config from '../../config';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4c1460f39ae0ce",
    pass: "143a89be9bcf01"
  }
});

export class NodeMailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    transport.sendMail({
      from: 'Feedget <oi@feedget.com>',
      to: config.ADMIN_EMAIL,
      subject: subject,
      html: body
    });
  };
}