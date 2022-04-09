//모듈

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//라우팅 routes합치기
const home = require("./src/routes/home");
const PORT = 3000;
//앱세팅 

const fs = require("fs");
const path = require("path");
app.engine('ejs', require('ejs').__express);
//views가지고 오기
app.set("views","./src/views");
app.set("view engine","ejs");
//어디서든 views를 부르기 static화
app.use(express.static(`${__dirname}/src/public`));
app.use(express.json());
app.use(express.urlencoded({extended :true}));


app.use("/",home); //미들웨어use 연결해줌 index.js랑


module.exports = app;

