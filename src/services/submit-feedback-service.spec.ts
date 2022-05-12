import { SubmitFeedbackService } from "./submit-feedback-service";

const submitFeedback = new SubmitFeedbackService(
  { create: async () => { } },
  { sendMail: async () => { } },
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'data:image/png;base64',
    })).resolves.not.toThrow();
  });

  it('should not be able to submit a feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'example comment',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
    })).rejects.toThrow();
  });

  it('should not be able to submit a feedback without a valid screenshot format', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg',
    })).rejects.toThrow();
  });
});

// basic syntax for jest test
// test('sum 2 + 2', () => {
//   expect(2 + 2).toBe(4);
// });