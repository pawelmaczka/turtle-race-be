import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import { createServer, Server } from 'http';
import Socket from 'services/Socket';
import Game from 'models/Game';

import games from './controllers/games';

class App {
  private app: Application;

  private server: Server;

  private port: number | string;

  public async start() {
    this.createExpressApp();
    this.createServer();
    await this.createSocketServer();
    this.configure();
    this.listen();
  }

  private createExpressApp() {
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private createServer() {
    if (this.app) {
      this.server = createServer(this.app);
    }
  }

  private async createSocketServer() {
    await Socket.startServer(this.server);
  }

  private configure() {
    this.port = process.env.PORT || 3000;
    this.configureRoutes();
  }

  private configureRoutes() {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('hello world');
    });
    this.app.use('/games', games);
  }

  private listen() {
    this.server.listen(this.port, () => {
      console.log('Application is running on port', this.port);
    });
  }
}

export default App;
