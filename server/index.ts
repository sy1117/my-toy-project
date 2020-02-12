import * as Reflect from "reflect-metadata"
import {createConnection} from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import Bundler from 'parcel-bundler'
import path from 'path';
import proxy from 'http-proxy-middleware'
import { User } from "./entity/User";


createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());


    app.use(
        '/api',
        proxy({
            target : 'http://localhost:3000',
            changeOrigin: true,
            // secure: true,
            pathRewrite: {
                '^/api' : ''
            },
        })
    )

    let bundler = new Bundler('./index.html', {
        outDir: './build'
    })
    app.use(bundler.middleware())

    // register express routes from defined application routes
    Routes.forEach((route:any) => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    app.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })

    // start express server
    app.listen(3000);

    await connection.manager.save(connection.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27
    }));
    await connection.manager.save(connection.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24
    }));

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
