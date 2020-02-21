import * as Reflect from "reflect-metadata"
import {createConnection} from "typeorm";
import express from "express";
import bodyParser from "body-parser";
import {Request, Response} from "express";
import {Routes} from "./routes";
import Bundler from 'parcel-bundler'
import path from 'path';
import { User } from "./entity/User";
import passport from './passport'
import proxy from 'http-proxy-middleware';
import { signToken, checkTokenMW, verifyToken } from "./authService";


createConnection().then(async connection => {

    let bundler = new Bundler('./index.html', {
        outDir: './build'
    })
    const clientServer = express()
    clientServer.use(bundler.middleware())
    // setup express app here
    clientServer.get('*', function (request, response){
        response.sendFile(path.resolve(__dirname, '../build', 'index.html'))
    })
    clientServer.listen(8081);

    var clientProxy = proxy({ target: 'http://localhost:8081', changeOrigin: true });

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(passport.initialize());
    // app.use(passport.session());

    // GET /auth/google
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  The first step in Google authentication will involve
    //   redirecting the user to google.com.  After authorization, Google
    //   will redirect the user back to this application at /auth/google/callback
    app.get(
        '/auth/google',
        passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
    );


    // GET /auth/google/callback
    //   Use passport.authenticate() as route middleware to authenticate the
    //   request.  If authentication fails, the user will be redirected back to the
    //   login page.  Otherwise, the primary route function function will be called,
    //   which, in this example, will redirect the user to the home page.
    app.get(
        '/auth/google/callback', 
        passport.authenticate('google', { 
            // successRedirect: '/auth/google/success',
            failureRedirect: '/',
            session: false,
        }),
        function(req, res:any) {
            signToken(req, res).then((token)=>{
                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 8 * 3600000) // cookie will be removed after 8 hours
                })
                res.redirect('/auth/google/success');
            })
        }
    );

    app.get(
        '/auth/google/success',
        (req, res)=>{
            res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
        }
    );

    app.get('/auth/verify', checkTokenMW, (req:any, res) => {
        verifyToken(req, res);
        if (null === req.authData) {
            res.sendStatus(403);
        } else {
            res.json(req.authData);
        }
    });

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


    app.use(express.static('build'));
    
    /* public page */
    app.get('/login', clientProxy)
    app.get('/logout', clientProxy)
    /* private page */
    app.get('*', checkTokenMW, (req, res)=>{
        verifyToken(req, res);
        res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
    })

    // start express server
    app.listen(8080);

}).catch(error => console.log(error));
