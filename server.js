const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors({ origin : 'https://krn-mkwn.github.io/pf/'}));
app.use(express.json()); // For parsing application/json

// Route to send email
app.post("/send-email", async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "karanmakwana0304@gmail.com", // Your Gmail address
            pass: "jcggfmeltdldjkdc", // Your Gmail password or app password
        },
    });

    const mailOptions = {
        from: email, // Sender's email address
        to: "karanmakwana0304@gmail.com", // Your email address to receive messages
        subject: `Portfolio Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).send({ message: "Failed to send email", error });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
 
app.get('/', (req, res) => {
    res.send('Hello World!')
  })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
