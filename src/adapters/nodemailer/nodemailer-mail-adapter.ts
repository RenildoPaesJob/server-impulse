import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "b90618b7dc4c6f",
        pass: "b11fc43dc037bb"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    
    async sendMail ({subject, body}: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Renildo Paes <renildopaeslandim@gmail.com>',
            subject,
            html: body
        })
    };
}