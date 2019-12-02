const { db } = require('../util/admin');

exports.getAllLists = (req, res) => {
  db.collection('lists')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let lists = [];
      data.forEach(doc => {
        lists.push({
          listId: doc.id,
          ...doc.data()
        });
      });
      return res.json(lists);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//create list
exports.postOneList = (req, res) => {
  const newlist = {
    name: req.body.name,
    items: req.body.items,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString()
  };

  db.collection('lists')
    .add(newlist)
    .then(doc => {
      res.json({ message: `document ${doc.id} created sucessfully` });
    })
    .catch(err => {
      res.status(500).json({ error: 'sometihng went wrong' });
      console.log(err);
    });
};

//get one list
exports.getList = (req, res) => {
  let listData = {};
  db.doc(`/lists/${req.params.listId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'list not found' });
      }
      listData = doc.data();
      listData.listId = doc.id;
      return res.json(listData);
    });
};

//edit list
exports.editList = (req, res) => {
  let listData = {};
  listData.coords.push(req.body.coords);

  db.doc(`/lists/${req.params.listId}`)
    .update(listData)
    .then(() => {
      return res.json({ message: 'Details updated successfully' });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//delete list
exports.deleteList = (req, res) => {
  const document = db.doc(`/lists/${req.params.listId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'list not found' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'list deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
