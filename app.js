const express = require('express')
const createError = require('http-errors')
const morgan = require('morgan')
require('dotenv').config()
var expressjwt = require('express-jwt')
const jwksClient = require('jwks-rsa')

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use(
    expressjwt({
        secret: jwksClient.expressJwtSecret({
            jwksUri: 'http://localhost:8005/.well-known/jwks.json',
            cache: true,
            rateLimit: true,
        }),
        algorithms: ['RS256']
    }).unless({path: ['/', '/protected']})
)
app.get('/',async(req,res,next)=>{
    res.send({ message: 'This is Resource API routs'});
});

app.get('/protected', async(req,res,next)=>{
    res.send({ message: 'This is Protected Route'})
});

app.listen(3000, ()=>{
    console.log('Running in PORT 3000');
})