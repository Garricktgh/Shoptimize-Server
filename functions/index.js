const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const express = require("express");
const app = express();

app.get("/products", (req, res) => {
  admin
    .firestore()
    .collection("products")
    .get()
    .then(data => {
      let products = [];
      data.forEach(doc => {
        products.push(doc.data());
      });
      return res.json(products);
    })
    .catch(err => console.error(err));
});

exports.createProducts = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Method not allowed" });
  }
  const newProduct = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date())
  };

  admin
    .firestore()
    .collection("products")
    .add(newProduct)
    .then(doc => {
      res.json({ message: `document ${doc.id} created sucessfully` });
    })
    .catch(err => {
      res.status(500).json({ error: "sometihng went wrong" });
      console.log(err);
    });
});

//https://baseurl.com/api
exports.api = functions.https.onRequest(app);
