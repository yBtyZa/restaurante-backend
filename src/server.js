const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const connection = require('./database/connection');

const APP_PORT = process.env.APP_PORT

class Server {
    constructor(server = express()) {
        this.middleware(server);
        this.database();
        server.use(routes);
        this.initializeServer(server);
    }

    middleware(server) {
        console.log('Executando middleware.');
        server.use(cors());
        server.use(express.json());
        console.log('Middleware executado com sucesso.');
    }

    async database() {
        try {
            console.log('Iniciando conexão com o banco de dados.');
            await connection.authenticate();
            console.log('Conexão com o banco de dados iniciada com sucesso.');
        } catch(error) {
            console.log("Erro ao iniciar conexão com o banco de dados: " + error);
        }   
    }
    initializeServer(server) {
        console.log('Iniciando servidor.');
        server.listen(3000, () => {
            console.log(`Servidor iniciado com sucesso na porta ${APP_PORT}.`);
        });
    }
}

module.exports = { Server };
