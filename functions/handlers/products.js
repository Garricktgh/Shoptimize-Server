const { db } = require('../util/admin');

exports.getAllProducts = (req, res) => {
  db.collection('products')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let products = [];
      data.forEach(doc => {
        products.push({
          screamId: doc.id,
          ...doc.data()
        });
      });
      return res.json(products);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.postOneProduct = (req, res) => {
  if (req.body.body.trim() === '') {
    return res.status(400).json({ body: 'Body must not be empty' });
  }

  const newProduct = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString()
  };

  db.collection('products')
    .add(newProduct)
    .then(doc => {
      res.json({ message: `document ${doc.id} created sucessfully` });
    })
    .catch(err => {
      res.status(500).json({ error: 'sometihng went wrong' });
      console.log(err);
    });
};
