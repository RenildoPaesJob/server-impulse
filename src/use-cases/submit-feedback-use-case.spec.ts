// test('sum 2 + 2', () => {
//     expect(2 + 2).toBe(4)
// })

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// SPIES = ESPIÕES (consegue saber se alguma função foi chamada)
const createFeedbackSpy = jest.fn();// chamando a fucntion p/ ser testada
const sendMailSpy = jest.fn();// chamando a fucntion p/ ser testada

//const com os espiões
const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy},
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'exampled feedback',
            screenshot: 'data:image/png;base64,fsdafçskfpap23p20242342rfaskpfsopf',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    })
})

describe('Submit feedback', () => {
    it('should not be able to submit a feedback without type', async () => {
        await expect(submitFeedback.execute({
            type: '',
            comment: 'exampled feedback',
            screenshot: 'data:image/png;base64,fsdafçskfpap23p20242342rfaskpfsopf',
        })).rejects.toThrow();
    })
})

describe('Submit feedback', () => {
    it('should not be able to submit a feedback without commet', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,fsdafçskfpap23p20242342rfaskpfsopf',
        })).rejects.toThrow();
    })
})

describe('Submit feedback', () => {
    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'esta tudo bugado!',
            screenshot: 'test.png',
        })).rejects.toThrow();
    })
})