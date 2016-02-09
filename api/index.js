import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import UserApi from './user';

function createExpressApp(){

    const app = express();
    app.disable('x-powered-by');
    app.use(bodyParser.urlencoded({
        limit: '3mb',
        extended: true,
    }));

    app.use(bodyParser.json({
        limit: '3mb',
    }));

    app.use(function (req, res, next){
        req.accepts('json, text');
        req.accepts('application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });

    app.use(cors());
    return app;
}

function onApiError(res, error){

    if (typeof error == typeof ""){
        return res.status(500).json({message: error});
    }

    res.status(500)
        .json(error);
}

module.exports = function Api(config) {
    const app = createExpressApp();
    const userApi = UserApi('./all-users.json');

    app.put('/user', function(req, res){
        userApi.add(req.body)
            .then((response) => {
                res.status(200)
                    .json(response);
            })
            .catch((error) => onApiError(res, error));
    })

    app.post('/auth/login', function(req, res){
        userApi.login(req.body)
            .then((response) => {
                res.status(200)
                    .json(response);
            })
            .catch((error) => onApiError(res, error));
    });

    const server = app.listen(config.port, function (error) {
        if (error){
            console.log('api-error->',error);
            return;
        }

        console.log(`api listening at 0.0.0.0:${config.port}`);
    });

    return server;
}
