const nodemailer = require("nodemailer");

// configuration for mail access
var smtpTransport = nodemailer.createTransport(
    `smtps://${process.env.MAIL_ID}` +
        encodeURIComponent(process.env.MAIL_PASSWORD) +
        "@smtp.gmail.com:465"
);

// function to send mail
const SendMail = (message, receiver, subject) => {
    mailOptions = {
        to: receiver,
        subject,
        html: message
    };

    console.log(`Sending mail to ${receiver}`);
    smtpTransport.sendMail(mailOptions, function(err, response) {
        if (err) {
            console.log(`Error while sending mail: ${err}`);
            throw err;
        } else {
            console.log("Message sent: " + response.message);
        }
    });
};

module.exports = { SendMail };
