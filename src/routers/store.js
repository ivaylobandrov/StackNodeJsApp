const express = require('express');
const router = new express.Router();

const ttlMap = {};
const stack = [];

// Endpoint to add a key-value pair to the store
router.post('/store', (req, res) => {
  const key = req.body.key;
  const value = req.body.value;
  const ttl = req.body.ttl ? req.body.ttl : 30;

  ttlMap[key] = Date.now() + ttl * 1000;

  stack.push({ key, value });
  res.sendStatus(200);
});

// Endpoint to get the value for a key
router.get('/store/:key', (req, res) => {
  const key = req.params.key;

  if (key in ttlMap && ttlMap[key] < Date.now()) {
    delete ttlMap[key];
    const index = stack.findIndex(item => item.key === key);
    if (index !== -1) {
      stack.splice(index, 1);
    }
    res.send('');
  } else {
    const item = stack.find(item => item.key === key);
    if (item) {
      res.send(item.value);
    } else {
      res.send('');
    }
  }
});

// Endpoint to delete the value for a key
router.delete('/store/:key', (req, res) => {
  const key = req.params.key;
  delete ttlMap[key];
  const index = stack.findIndex(item => item.key === key);
  if (index !== -1) {
    stack.splice(index, 1);
  }
  res.sendStatus(200);
});

module.exports = router