const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const app = require('express')();
const databaseConfig = require('./config/database');
const expressConfig = require('./config/express');
const routesConfig = require('./config/routes');

(async () => {
    await databaseConfig(app);
    await expressConfig(app);
    routesConfig(app);
    app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}!`, " Link to site: ", `http://localhost:${config.port}/`);
    });
})();


