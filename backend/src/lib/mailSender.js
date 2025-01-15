const nodemailer = require('nodemailer');

const mailSender = async (email, title, body) => {
  try {
    
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "singhjap302@gmail.com", 
        pass: "ynrgdchmokeikfcu", 
      },
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: "singhjap302@gmail.com", 
      to: email, 
      subject: title,
      html: body, 
    });

    console.log("Email sent successfully: ", info.response);
    return info;
  } catch (error) {
    console.error("Error while sending email:", error.message);
    throw new Error("Failed to send email");
  }
};

module.exports = mailSender;
