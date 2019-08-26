const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http';
// const serverPort = process.env.PORT || 3000;

app.prepare().then(() => {
    const server = express();

    // logging https://github.com/expressjs/morgan
    server.use(morgan('dev'));

    server.use('/', express.static(path.join(__dirname, 'public')));
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));
    server.use(cookieParser(process.env.COOKIE_SECRET));
    server.use(
        expressSession({
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET,
            cookie: {
                httpOnly: true,
                secure: false,
            },
        }),
    );

    server.get('/category/:slug', (req, res) => {
        return app.render(req, res, '/category', { slug: req.params.slug });
    });

    server.get('/tag/:slug', (req, res) => {
        return app.render(req, res, '/tag', { slug: req.params.slug });
    });

    server.get('/search', (req, res) => {
        return app.render(req, res, '/search', {
            keyword: '',
        });
    });

    server.get('/search/:keyword', (req, res) => {
        return app.render(req, res, '/search', {
            keyword: req.params.keyword,
        });
    });

    // server.get('/post/:slug', (req, res) => {
    //     return app.render(req, res, '/post', { slug: req.params.slug });
    // });

    // server.get('/users/:user/posts', (req, res) => {
    //     return app.render(req, res, '/users/posts', {
    //         user: req.params.user,
    //     });
    // });

    server.get('/users/:user/posts', (req, res) => {
        return app.render(req, res, '/users/posts', {
            user: req.params.user,
        });
    });

    server.get('/users/:user/categories/:category/posts', (req, res) => {
        return app.render(req, res, '/users/categoryposts', {
            user: req.params.user,
            category: req.params.category,
        });
    });

    server.get('/users/:user/posts/:slug', (req, res) => {
        return app.render(req, res, '/users/post', {
            user: req.params.user,
            slug: req.params.slug,
        });
    });

    // expressApp.get('/me/write/:id', (req, res) => {
    //     return nextApp.render(req, res, '/me/write', { id: req.params.id });
    // });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, '0.0.0.0', () => {
        console.log(`server is running on ${protocol}://${host}:${port}`);
    });
});
