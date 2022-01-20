const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

//initialise transporter
let transporter = nodemailer.createTransport({
  service: "hotmail",
  secure: false,
  auth: {
    user: process.env.email, // generated ethereal user
    pass: process.env.password, // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
});

//send email

const sendEmail = async (req, res) => {
  const mailDetails = {
    from: process.env.email, // sender address
    to: `${req.body.token.email}`, // list of receivers
    subject: "Order details", // Subject line
    html: `<p>Thank you for your purchase. Your track id is ${req.order._id}</p>
            <p>You can track your package <a href = https://dogye.herokuapp.com/track/${req.order._id}>here</a></p>
    
    `, // html body
  };
  // send mail with defined transport object
  await transporter.sendMail(mailDetails, (err, info) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    return res.status(201).json(req.order);
  });
};

module.exports = { sendEmail };
