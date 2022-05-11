import nodemailer from 'nodemailer';
import config from '../../config';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: config.MAILTRAP_HOST,
  port: config.MAILTRAP_PORT,
  auth: {
    user: config.MAILTRAP_USER,
    pass: config.MAILTRAP_PASS
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