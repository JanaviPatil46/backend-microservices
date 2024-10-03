
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/passwordupdate", async (req, res) => {

    const { email } = req.body;
   
    if (!email) {
        res.status(400).json({ status: 400, message: "Please provide all data." })
    }

    const result = {
        email
      }

   const mailSubject =  "Password Updated Successfully."

   // HTML content for the email body
    const htmlPage = `
  <!doctype html>
<html lang="en">
<style>
    p {
        color: #0f172a;
        font-size: 18px;
        line-height: 29px;
        font-weight: 400;
        margin: 8px 0 16px;
    }

    h1 {
        color: #5566e5;
        font-weight: 700;
        font-size: 40px;
        line-height: 44px;
        margin-bottom: 4px;
    }

    h2 {
        color: #1b235c;
        font-size: 100px;
        font-weight: 400;
        line-height: 120px;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .container {
        text-align: center;
    }
</style>

<body>
    <header>
        <!-- place navbar here -->
    </header>
    <main>

        <div class="container ">
            <h1> Welcome to PMS </h1>

            <p>Your Accounts Password has been updated successfully.</p>
        
            <h5>"Welcome to "SNP Tax & Financials", where tax management meets simplicity. Our advanced software
                streamlines tax processes for individuals, businesses, and professionals, ensuring accuracy and
                efficiency. Experience a new era of financial ease with SNP Tax & Financials."</h5>
        </div>

    </main>

</body>

</html>`;

    // Create transporter with Outlook service and authentication
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "rohitkumbhar7009@gmail.com",
            pass: "vwjz zrbe rwbe dhnj",
        },
    });

    const mailOptions = {
        from: "rohitkumbhar7009@gmail.com",
        to: email,
        subject: mailSubject,
        html: htmlPage,
    };


    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent to user:", info.response);
            res.status(200).json({ status: 200, result });
        }
    });
});

module.exports = router;
