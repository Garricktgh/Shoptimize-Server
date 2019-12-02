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
const {
  getAllMaps,
  postOneMap,
  getMap,
  editMap,
  deleteMap
} = require('./handlers/maps');
const {
  getAllLists,
  postOneList,
  getList,
  editList,
  deleteList
} = require('./handlers/lists');

// products routes
app.get('/products', getAllProducts);
app.post('/product', FBAuth, postOneProduct);

// maps routes
app.get('/maps', getAllMaps);
app.post('/map', postOneMap);
app.get('/map/:mapId', getMap);
app.put('/map/:mapId', editMap);
app.delete('/map/:mapId', deleteMap);

// shoppingLists routes
app.get('/lists', FBAuth, getAllLists);
app.post('/list', FBAuth, postOneList);
app.get('/list/:listId', FBAuth, getList);
app.put('/list/:listId', FBAuth, editList);
app.delete('/list/:listId', FBAuth, deleteList);

// users route
app.post('/signup', signup);
app.post('/login', login);
app.post('/user/image', FBAuth, uploadImage);
app.post('/user', FBAuth, addUserDetails);
app.get('/user', FBAuth, getAuthenticatedUser);

//https://baseurl.com/api
exports.api = functions.region('asia-northeast1').https.onRequest(app);
