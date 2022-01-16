import nodemailer from "nodemailer";

export const sendEmail = async (to: string, html: string) => {
  //   let testAccount = await nodemailer.createTestAccount();
  //   console.log("testAccount", testAccount);

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "bxh753xj7zeqzb54@ethereal.email", // generated ethereal user
      pass: "Y4JF9mVfZgPk7dUA1e", // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to, // list of receivers
    subject: "Change Password", // Subject line
    html,
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
};
