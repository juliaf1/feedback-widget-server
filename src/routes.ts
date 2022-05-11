import express from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';
import { NodeMailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  // Defining adapters (database and mailer)
  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodeMailerMailAdapter = new NodeMailerMailAdapter();

  const submitFeedbackService = new SubmitFeedbackService(prismaFeedbacksRepository, nodeMailerMailAdapter);

  await submitFeedbackService.execute({ type, comment, screenshot })

  return res.status(201).send();
})