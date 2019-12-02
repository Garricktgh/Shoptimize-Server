const { db } = require('../util/admin');

exports.getAllMaps = (req, res) => {
  db.collection('maps')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      let maps = [];
      data.forEach(doc => {
        maps.push({
          mapId: doc.id,
          ...doc.data()
        });
      });
      return res.json(maps);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

//create map
exports.postOneMap = (req, res) => {
  mapCoords = [];
  mapCoords.push(req.body.coords);

  const newMap = {
    name: req.body.name,
    location: req.body.location,
    coords: mapCoords,
    createdAt: new Date().toISOString()
  };

  db.collection('maps')
    .add(newMap)
    .then(doc => {
      res.json({ message: `document ${doc.id} created sucessfully` });
    })
    .catch(err => {
      res.status(500).json({ error: 'sometihng went wrong' });
      console.log(err);
    });
};

//get one map
exports.getMap = (req, res) => {
  let mapData = {};
  db.doc(`/maps/${req.params.mapId}`)
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Map not found' });
      }
      mapData = doc.data();
      mapData.mapId = doc.id;
      return res.json(mapData);
    });
};

//edit map
exports.editMap = (req, res) => {
  let mapData = {
    coords: []
  };
  mapData.coords.push(req.body.coords);

  db.doc(`/maps/${req.params.mapId}`)
    .update(mapData)
    .then(() => {
      return res.json({ message: 'Details updated successfully' });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

//delete map
exports.deleteMap = (req, res) => {
  const document = db.doc(`/maps/${req.params.mapId}`);
  document
    .get()
    .then(doc => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'map not found' });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: 'map deleted successfully' });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};
