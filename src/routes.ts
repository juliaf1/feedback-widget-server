import express from 'express';
import nodemailer from 'nodemailer';
import config from './config';
import { prisma } from './prisma';

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "4c1460f39ae0ce",
    pass: "143a89be9bcf01"
  }
});

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  transport.sendMail({
    from: 'Feedget <oi@feedget.com>',
    to: config.ADMIN_EMAIL,
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 14px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`
    ].join('\n'),
  });

  return res.status(201).json(feedback);
})