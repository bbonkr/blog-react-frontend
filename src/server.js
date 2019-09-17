const express = require('express');
const next = require('next');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';

const app = next({ dev: dev });
const requestHandler = app.getRequestHandler();

dotenv.config();

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
const protocol = process.env.PROTOCOL || 'http';
// const serverPort = process.env.PORT || 3000;

app.prepare().then(() => {
    const server = express();

    // logging https://github.com/expressjs/morgan
    server.use(morgan('dev'));

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

    server.get('*', (req, res) => requestHandler(req, res));

    server.listen(port, (err) => {
        if (err) {
            throw err;
        }

        console.log(`server is running on ${protocol}://${host}:${port}`);
    });
});
