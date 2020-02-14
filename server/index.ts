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
import passport from './passport'

createConnection().then(async connection => {

    // create express app
    const app = express();
    app.use(bodyParser.json());

    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/callback
    app.get(
        '/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
        // passport.authenticate('google', { scope: ['openid'] }
    );


    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/' }),
        function(req, res) {
            res.redirect('/');
        }
    );

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


    let bundler = new Bundler('./index.html', {
        outDir: './build'
    })
    app.use(bundler.middleware())

    // setup express app here
    app.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, '../build', 'index.html'))
    })

    // start express server
    app.listen(3000);


}).catch(error => console.log(error));
