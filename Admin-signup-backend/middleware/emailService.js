const nodemailer = require("nodemailer");

    // Create transporter with Outlook service and authentication
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
          user: "rohitkumbhar7009@gmail.com",
          pass: "vwjz zrbe rwbe dhnj",
      },
  });
  
// Function to send email
function sendEmail(from, to, subject, text) {
  //html page 
  
  const mailOptions = {
    from: "vinayak.intcon@gmail.com",
    to: to,
    subject: subject,
    text: text,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = sendEmail;
