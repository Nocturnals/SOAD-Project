const nodemailer = require("nodemailer");

class MailingService {
    static smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.MAIL_ID || 'mail id',
            pass: process.env.MAIL_PASSWORD || 'password'
        }
    });

    static Sendmail = (message, receiver, subject) => {
        const mailOptions = {
            from: process.env.MAIL_ID,
            to: receiver,
            subject,
            html: message
        };

        console.log(`Sending mail to ${receiver}`);
        MailingService.smtpTransport.sendMail(mailOptions, function(
            err,
            response
        ) {
            if (err) {
                console.log(`Error while sending mail: ${err}`);
                return false;
            } else {
                console.log("Message sent: " + response);
                return true;
            }
        });
    };
}

module.exports = { MailingService };
