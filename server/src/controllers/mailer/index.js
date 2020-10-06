import nodemailer from 'nodemailer';
import url from 'url';
require('dotenv').config();


const transEmail = async (req, res) => {
  const { email } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      }
    });
  
    const info = {
      from: `"DDCComputer" ${process.env.EMAIL_USER}`,
      to: email,
      subject: '광화문 집회...문재인 정부 이대로 가면',
      html: `
      <img src="https://image.fmkorea.com/files/attach/new/20200616/486616/1656451610/2949357783/00c58fbff364944d81103e4aed32dbde.jpeg" />
      <h1>
        라이더!
      </h1>`,
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
    
    res.redirect(url.format({
      pathname: '/',
      query: {
        "success": "email_passed"
      },
    }));
    } catch (err) {
    console.log('nodemailer error');
    console.error(err);
  }
};


export default transEmail;