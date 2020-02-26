// App Vai controlar a inicialização do aplicativo

import express from 'express';
import routes from './routes';
import './database';

class App {
    constructor() {
        // executar o express
        this.server = express();

        // Executar os métodos
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json);
    }

    routes() {
        // routes tambem é um middleware então pode ser usado assim
        this.server.use(routes);
    }
}

// exportar somente o que vai precisar usar
export default new App().server;
