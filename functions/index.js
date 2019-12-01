const functions = require('firebase-functions');

const app = require('express')();
const FBAuth = require('./util/fbAuth');

const cors = require('cors');
app.use(cors());

const { getAllProducts, postOneProduct } = require('./handlers/products');
const {
  signup,
  login,
  uploadImage,
  addUserDetails,
  getAuthenticatedUser
} = require('./handlers/users');

// products routes
app.get('/products', getAllProducts);
app.post('/product', FBAuth, postOneProduct);

// users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

//https://baseurl.com/api
exports.api = functions.region('asia-northeast1').https.onRequest(app);
