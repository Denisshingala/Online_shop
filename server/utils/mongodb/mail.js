const nodemailer = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars").default;

const mail = (from, to, subject, text, { template, context } = {}) => {
    // Mail transporter
    const mailTransfer = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    });

    // Configure Handlebars
    if (template) {
        mailTransfer.use("compile", hbs({
            viewEngine: {
                extName: ".hbs",
                partialsDir: path.resolve(__dirname, "../../view"),
                defaultLayout: false,
            },
            viewPath: path.resolve(__dirname, "../../view"),
            extName: ".hbs",
        }));

        return mailTransfer.sendMail({
            from: from,
            to: to,
            subject: subject,
            template: template,
            context: context
        });
    } else {
        return mailTransfer.sendMail({
            from: from,
            to: to,
            subject: subject,
            text: text
        });
    }
};

module.exports = mail;