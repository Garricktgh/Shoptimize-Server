const functions = require('firebase-functions');

const app = require('express')();

const FBAuth = require('./util/fbAuth');

const { getAllProducts, postOneProduct } = require('./handlers/products');
const { signup, login, uploadImage } = require('./handlers/users');

// products routes
app.get('/products', getAllProducts);
app.post('/product', FBAuth, postOneProduct);

// users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);

//https://baseurl.com/api
exports.api = functions.region('asia-northeast1').https.onRequest(app);
