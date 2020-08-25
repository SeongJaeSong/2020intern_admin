# Innovation Academy mentoring system admin

[![npm version](https://img.shields.io/badge/npm-6.14.6-red)](https://www.npmjs.com/)
[![express version](https://img.shields.io/badge/express-4.17.1-blue)](https://expressjs.com/)

## Summary
2020년 6월부터 2020년 8월까지 이노베이션 아카데미에서 인턴십을 통해 진행한 프로젝트이다.
기술 스택을 키워드로 사용하고, 키워드를 기반으로 멘토와 멘티를 매칭시켜주는 서비스의 운영 툴을 개발하였다.
DB는 MySQL을 사용하였고, 언어와 프레임워크는 Typescript+Node.js+Express.js를 사용하였다. 서비스의 주요 개념인 유저, 매칭, 키워드, 알림, 로그 등에 대하여 CRUD기능을 처리하는 REST API를 개발하였고 Jest를 이용해 각 API에 대한 유닛 테스트 코드를 작성하였다.
전반적인 백엔드의 개발을 맡아 API, Unit test, Pagination, LogIn 기능을 구현하였다.
기획 및 설계 문서는 구글 드라이브에 정리해두었다. (링크: https://drive.google.com/drive/folders/1x8xPHh_r2AYQLqPx4y-TemxPITn_Inxi?usp=sharing)

## How To Install/Start
```
git clone https://github.com/open-inno/2020intern_admin.git
npm install
npm run
```

<br>
<br>

## Environment
|Classification|Specification|
|:------:|:-------|
| **OS** | macOS Catalina 10.15.5 |
| **Server** | node 12.18.2 |
| **Database** | MySQL 8.0.21 |

<br>
<br>

## Dependency
|Dependencies|Version|
|---:|:---|
| @types/express| 4.17.7 |
| @types/jest| 26.0.9 |
| cookie-parser| 1.4.5 |
| dedent| 0.7.0 |
| dedent-js| 1.0.1 |
| jest| 26.2.2 |
| jsonwebtoken| 8.5.1 |
| morgan| 1.10.0 |
| mysql2| 2.1.0 |
| nodemon| 2.0.4 |
| npm-run-all| 4.1.5 |
| supertest| 4.0.2 |
| ts-jest| 26.1.4 |
| ts-loader| 8.0.1 |
| ts-node| 8.10.2 |
| typescript| 3.9.7 |
| webpack| 4.44.0 |
| webpack-cli| 3.3.12 |
| body-parser| 1.19.0 |
| ejs| 3.1.3 |
| express| 4.17.1 |
| moment| 2.27.0 |
| mysql2-promise| 0.1.4 |
| path| 0.12.7 |
| source-map-support| 0.5.19 |
| winston| 3.3.3 |
| winston-daily-rotate-file| 4.5.0 |
