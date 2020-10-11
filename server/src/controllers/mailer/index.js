import nodemailer from 'nodemailer';
import url from 'url';
import sequelize from '../../models';
const { User } = sequelize;
require('dotenv').config();


const transEmail = async (req, res, next) => {
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

    const user = await User.findOne({ where: { email }});

    const info = {
      from: `"DDCComputer" ${process.env.EMAIL_USER}`,
      to: email,
      subject: '[컴퓨터정보학과] 비밀번호 변경 안내사항입니다.',
      html: `
        수신 코드: ${user.hash}
      `
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
    
    next();
    // res.redirect(url.format({
    //   pathname: '/',
    //   query: {
    //     "success": "email_passed"
    //   },
    // }));
    } catch (err) {
    console.log('nodemailer error');
    console.error(err);
  }
};


export default transEmail;