import nodemailer from 'nodemailer';
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
        <body>
          <div style="display: inline-block">
            <img src="https://avatars2.githubusercontent.com/u/50310464?s=460&u=f07ee268c49e26c81d411da21f085bef7f72ed52&v=4" />
            <h3>최은기</h3>
            <img src="https://avatars2.githubusercontent.com/u/57123802?s=460&u=c018c65ec73f4a41926d7a8f6780f4db5b314644&v=4" />
            <h3>킹 황 김 준 재</h3>
            <img src="https://avatars0.githubusercontent.com/u/57584529?s=460&v=4" /> 
            <h3>정지용</h3>
            <img src="https://github.com/bs4biz6298" />
            <h3>엄민호</h3>
            <br />
          </div>
          <h1>수신 코드: ${user.hash}</h1>
        </body>
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