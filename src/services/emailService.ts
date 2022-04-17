import * as nodemailer from 'nodemailer';

import {config} from '../configs/config';
import {emailActionEnum, emailInfo} from "../constants";

class EmailService {
    sendMail(userMail: string, action: emailActionEnum) {

        const { subject, html } = emailInfo[action];

        const emailTransporter = nodemailer.createTransport({
            from: 'No Reply Sep2021',
            service: 'gmail',
            auth: {
                user: config.NO_REPLY_EMAIL,
                pass: config.NO_REPLY_EMAIL_PASSWORD,
            }
        });

        return emailTransporter.sendMail({
            to: userMail,
            subject,
            html,
        });
    }

}

export const emailServise = new EmailService();
