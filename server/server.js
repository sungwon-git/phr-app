/***********************************************************************************
 express 서버 설정
***********************************************************************************/
const express = require("express");
const app = express();
const port = 3100;

const env = require("dotenv");
env.config();

/***********************************************************************************
 cors 설정
***********************************************************************************/
const cors = require("cors");
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);

/***********************************************************************************
 bodyParser 설정
***********************************************************************************/
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser({ limit: "50mb" }));

/***********************************************************************************
 mongodb 설정
***********************************************************************************/
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://swjung:tjddnjs77!@localhost:27017/phr", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", function () {
	console.log("mongodb is connected");
});
db.once("error", function () {
	console.log("mongodb error ");
});

/***********************************************************************************
 session 설정
***********************************************************************************/
//session 사용 선언
const session = require("express-session");
//session store로 mongodb 사용 선언
const mongoStore = require("connect-mongo");
// const FileStore = require("session-file-store")(session); // 1

//session 메시지 처리
const flash = require("connect-flash");
app.use(flash());

app.use(
	session({
		secure: true,
		cookie: {
			maxAge: 60 * 1000, // 1000 = 1초, 60 *1000= 1분, 60*60*1000=1시간
		},
		//secret 은 변수처리해서 관리할것
		secret: "personal health records",
		//기본값은 false session data가 바뀌지 않으면 저장소를 저장하지 않는다는 뜻
		resave: false,
		//세션이 필요하기 전까지는 세션을 구동시키지 않는다는 뜻
		saveUninitialized: true,
		store: mongoStore.create({
			mongoUrl: "mongodb://swjung:tjddnjs77!@localhost:27017/phr",
		}),
	})
);

/***********************************************************************************
 passport 설정
***********************************************************************************/
// passport 사용 선언 : passport 는 인증 절차를 로직을 편하게 작업할 수 있게 도와주는 Node.js 미들웨어이다
const passport = require("passport");

// passport 초기화 : passport 초기화 시 user정보가 req.user로 들어감
app.use(passport.initialize());
app.use(passport.session());

/***********************************************************************************
 router
***********************************************************************************/
const userController = require("./controllers/user");
const organizationController = require("./controllers/organization");
const documentController = require("./controllers/document");
const accountController = require("./controllers/account");
const tokenController = require("./controllers/token");

/***********************************************************************************
 router - root
***********************************************************************************/

app.get("/", (req, res) => {
	res.send("welcome");
});

/***********************************************************************************
 router - user management
***********************************************************************************/

app.post("/signup", userController.signup);

// app.post("/signin", userController.signin, (req, res) => {
// 	// console.log(req.user);
// 	res.status(200).json(req.user);
// });
// app.get("/signin/failure", userController.signinFailure);

app.get("/auth", userController.JWTAuthenticated, (req, res) => {
	res.status(200).send(req.user);
});

app.post("/auth", userController.JWTcreate);

/***********************************************************************************
 router - 병원리스트 관리
***********************************************************************************/
app.post("/organization/insert", organizationController.save);
app.get("/organizations", organizationController.organizations);
app.get("/organization/:id", organizationController.organization);

/***********************************************************************************
 router - 문서 관리
***********************************************************************************/
// http://localhost:4000/createEncounter
// app.post('/encounter/save', encController.save);
// // http://localhost:4000/getEncounter
// app.get('/encounter/:userId', encController.encounter);

app.post("/documents/insert", documentController.insert);
app.post("/documents/save", documentController.save);
app.post("/documents/update", documentController.update);
app.post("/document", documentController.document);
app.post("/documents", documentController.documents);

/***********************************************************************************
 router - 계정 관리
***********************************************************************************/
app.post("/account", accountController.account);

/***********************************************************************************
 router - 토큰 관리
***********************************************************************************/
app.post("/token/save", tokenController.save);
app.post("/token", tokenController.token);

/***********************************************************************************
 Server Start - port: 3500
***********************************************************************************/
app.listen(port, function () {
	console.log("PHR app server is listening on port ", port);
});
