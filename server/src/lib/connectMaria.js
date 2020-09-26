import { sequelize } from '../models';
import { config } from 'dotenv';
import fs from 'fs';
import os from 'os';
config();

// TODO: 에러 로그에 대한 처리가 모자람


const initLog = {
  // 현재 데이터베이스 상태를 저장하는 객체
  mariadbStatus: {
    information: {
      username: process.env.MARIADB_USERNAME,
      database: process.env.MARIADB_STATUS
    }
  },

  // 데이터베이스상태를 콘솔에 출력해주는 메서드 
  mariadbStatusText() {
    console.group('mariadb-connection');
    console.log('GCP 가상서버의 MariaDB 서버로 성공적으로 연결되었습니다.')
    console.log(`연결된 사용자: ${process.env.MARIADB_USERNAME}`);
    console.log(`연결된 데이터베이스: ${process.env.MARIADB_STATUS}\n`);
    console.groupEnd('mariadb-connection');
  },

  showHost() {
    console.group('HOSTINFO');
    console.log(`USER: ${os.hostname()}`);
    console.log(`PORT: ${process.env.PORT}`);
    console.log(`Totally: http://localhost:${process.env.PORT}`);
    console.groupEnd('HOSTEND');
  },

  // 팀 멤버의 역할/GITHUB주소 를 저장하는 객체
  introduce: {
    'PM/BACKEND' : {
      GITHUB: 'https://github.com/galaxy4276',
    },
    'DB/BACKEND': {
      GITHUB: 'https://github.com/bs4biz6298'
    },
    'ENGINEER/FRONTEND': {
      GITHUB: 'https://github.com/bear-bear-bear'
    },
    'DESIGNER/FRONTEND': {
      GITHUB: 'https://github.com/wscrg'
    },
  },

  // 에러관련 프로퍼티나 메서드를 정의하는 객체
  error: {
    // log/mariadb.log에 에러내용을 기록해주는 메서드
    writeMariaLog(e) {
      const wstream = fs.createWriteStream('log/mariadb.log');
      wstream.write(String(e), 'utf-8', () => {
        console.log('log/mariadb.log에 성공적으로 에러를 기록하였습니다.');
      });
      wstream.on('finish', () => console.log('로그를 기록했습니다.'));
    }
  }
};

// 외부 DB서버에 연결을 수행하는 함수
const connectMaria = async () => {
  await sequelize.sync() // DB 연결 시도
    // DB 연결 성공 
    .then(() => { 
      console.log('\n\n\n+====================== DATABASE_INFO =======================+\n');
        console.table(initLog.mariadbStatus);
        initLog.mariadbStatusText();
      console.log('+========================== MEMBER ==========================+\n');
      console.table(initLog.introduce);
      console.log('+=========================== HOST ===========================+\n');
      initLog.showHost();
      })
      // DB 연결 실패 ( 로깅 )
    .catch(async (e) => { 
      console.log('\n !!!!!!!!!!!!! ERRROR !!!!!!!!!!!!!');
      console.log('외부 디비서버 접근이 실패했습니다.');

      const isFile = fs.existsSync('log/mariadb.log', (exist) => {
        return (exist) ? exist : null;
      });
      
      if (isFile) {
        initLog.error.writeMariaLog(e);
      } else {

        console.log('로그 파일이 존재하지 않습니다.');
        fs.open('log/mariadb.log', 'w+', (err, fd) => {
          console.log('mariadb.log 로그 파일을 생성하였습니다.');
        });
        initLog.error.writeMariaLog(e);
      }
    });
};


export default connectMaria; 