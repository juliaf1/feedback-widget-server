import { prisma } from './prisma';
import express from 'express';
import nodemailer from 'nodemailer';

const app = express();

app.use(express.json()); // middleware

app.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot,
    }
  })

  return res.status(201).json(feedback);
})

app.get('/hello', (req, res) => {
  return res.send('Hello World!');
});

app.listen(3333, () => {
  console.log('running');
});