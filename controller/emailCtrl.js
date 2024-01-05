// I MUST TAKE A LOOK AT THIS FILE LATER. IT DOES NOT SEND EMAILS AT ALL.


const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async(data,req, res) =>{
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ID, // generated ethereal user
      pass: process.env.MP, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false, // This accepts all self-signed certificates. THIS IS FOR DEVELOPMENT PHASE ONLY. REMOVE IT FOR PRODUCTION.
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hello There" <abc@gmail.com', // sender address
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

});



module.exports = sendEmail;







