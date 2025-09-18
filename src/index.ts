import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import {GomController} from './controller/gom.controller';

// .env 파일을 먼저 로드합니다.
dotenv.config();

const app = express();

// cors() 함수를 호출하여 미들웨어를 실행합니다.
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ejs 세팅
app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.get('/nickname/:name', GomController.recentGame);

app.post('/discord', GomController.sendMessageToDiscord);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});