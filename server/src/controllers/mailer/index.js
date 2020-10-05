import nodemailer from 'nodemailer';
import sequelize from 'sequelize';


const transEmail = async (req, res) => {
  const { email } = req.body;
  console.log(`email: ${email}`);

  try {
    const testAccount = nodemailer.createTestAccount();
    console.log(testAccount);
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'galaxyhi4276@gmail.com',
        pass: 'kneyianlbpjssums',
      },
      tls: {
        rejectUnauthorized: false,
      }
    });
  
    const info = {
      from: `"test mail" <galaxyhi4276@gmail.com>`,
      to: email,
      subject: 'Test',
      html: '<b>Test!!!!</b>',
    };

    await transporter.sendMail(info, (err, res) => {
      console.log('res');
      console.table(res);

      if (err) {
        throw err;
      } else {
        console.log('success');
      }
      transporter.close();
    });
  } catch (err) {
    console.log('nodemailer error');
    console.error(err);
  }
};


export default transEmail;