import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'pug');
// app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

app.listen(app.get('port'), () => {
  console.log('Application is running at port', app.get('port'));
});
