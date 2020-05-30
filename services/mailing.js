/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const sequelize = require('sequelize');
const schedule = require('node-schedule');

const { Op } = sequelize;
const moment = require('moment');
const nodemailer = require('nodemailer');
const db = require('../models');

// 현재 날짜가 속한 달의 게시물을 전체 get
const mailing = async () => {
  const lazyUsers = await db.User.findAll({
    where: {
      lastLoginAt: {
        [Op.lte]: moment().subtract(7, 'days'),
      },
    },
    attributes: ['email', 'username', 'lastLoginAt'],
    raw: true,
  });
  // 게으른 유저에 해당되는 사람들이 [ { email: 'test1@example.com', username: 'testUser1' }] 담겨 옵니다

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // gmail 계정 아이디를 입력
      pass: process.env.PASSWORD, // gmail 계정의 비밀번호를 입력
    },
  });

  /* 주의 할 점 : gmail 을 사용할 경우 반드시 아래의 링크로 들어가서 낮은 보안 앱 사용 설정 허용!으로 해줄 것
  https://myaccount.google.com/lesssecureapps 
  앱 실험이 끝날 경우 다시 보안을 위해 사용 설정 허용하지 않음으로 바꾸길 권장
  */

  for (const user of lazyUsers) {
    const mailOptions = {
      from: process.env.EMAIL, // 발송 메일 주소 (위에서 작성한 gmail 계정 아이디)
      to: user.email, // 수신 메일 주소
      subject: `[Go-fit]${user.username}, Come back to Go-fit`, // 제목
      text: `   Dear Mr/Ms. ${user.username},

            We are Go-fit who make you get in shape!
            You visited to Go-fit at ${user.lastLoginAt}.
            Keep a journal to reach out your goal!
            
            Your faithfully,
            Go-Fit`, // 내용
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
};

const mailingService = async (req, res, next) => {
  await mailing();
  console.log('재촉 메일이 발송되었습니다');
};

schedule.scheduleJob({ hour: 9, minute: 0, dayOfWeek: 1 }, mailingService);
// dayOfweek : 0 Sun - 6 Sat

module.exports = mailingService;
