const node_mailer = require('nodemailer');
require('dotenv').config();

const transporter = node_mailer.createTransport({
    service: 'GMAIL',
    auth: {
        user: process.env.NM_GMAIL,
        pass: process.env.NM_PASSWORD
    }
});

module.exports = transporter;