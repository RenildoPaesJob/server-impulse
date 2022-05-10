// import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks-repository"

import { MailAdapter } from "../adapters/mail-adapter"
import { FeedbackRepository } from "../repositories/feedbacks-repository"

interface SubmitFeedbackUseCaseRequest {
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackUseCase {
    constructor(
        private feedbackRepository: FeedbackRepository,
        private mailAdapter: MailAdapter,
    ){}

    async execute(resquest: SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = resquest

        if (!type) {
            throw new Error(`Type is required`)
        }

        if (!comment) { 
            throw new Error(`Comment is required`)
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error(`Invalid screenshot format.`)
        }

        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px: color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                `</div>`,
            ].join('\n')
        })
        /* SEM USAR O PRINCIPIO DE INVERSÃO DE DEPENDENCIA
         *const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
         *
         *await prismaFeedbacksRepository.create({
         *   type,
         *   comment,
         *   screenshot
         *})
        */
    }
}