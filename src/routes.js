const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Olá mundo' }));

module.exports = routes;
