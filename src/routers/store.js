const express = require('express');
const router = new express.Router();
const stack = require('../stack/stack');
const ttlMap = require('../store/store');

// Endpoint to add a key-value pair to the store
router.post('/store', (req, res) => {
  const key = req.body.key;
  const value = req.body.value;
  const ttl = req.body.ttl ? req.body.ttl : 30;

  ttlMap.ttlMap.set(key, Date.now() + ttl * 1000);

  stack.push({ key, value });
  res.status(200).json({ message: 'OK' });
});

// Endpoint to get the value for a key
router.get('/store/:key', (req, res) => {
  const key = req.params.key;

  if (ttlMap.ttlMap.has(key) && ttlMap.ttlMap.get(key) < Date.now()) {
    ttlMap.ttlMap.delete(key);
    const index = stack.stack.findIndex(item => item.key === key);
    if (index !== -1) {
      stack.stack.splice(index, 1);
    }
    res.json({ message: 'OK' });
  } else {
    const item = stack.stack.find(item => item.key === key);
    if (item) {
      res.json({ message: 'OK', value: item.value });
    } else {
      res.json({ message: 'OK', value: '' });
    }
  }
});

// Endpoint to delete the value for a key
router.delete('/store/:key', (req, res) => {
  const key = req.params.key;
  ttlMap.ttlMap.delete(key);
  const index = stack.stack.findIndex(item => item.key === key);
  if (index !== -1) {
    stack.stack.splice(index, 1);
  } else if (stack.stack.length < 1) {
    return res.status(404).json({ message: 'Store is empty' });
  }
  res.status(200).json({ message: 'OK' });
});

module.exports = router;