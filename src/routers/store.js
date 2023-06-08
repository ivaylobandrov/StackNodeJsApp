const express = require('express');
const router = new express.Router();
const ttlMap = require('../store/store');

// Endpoint to add a key-value pair to the store
router.post('/store', (req, res) => {
  const key = req.body.key;
  const value = req.body.value;
  const ttl = req.body.ttl ? req.body.ttl : 30;

  ttlMap.set(key, { value, ttl: Date.now() + ttl * 1000 });

  res.status(200).json({ message: 'OK' });
});

// Endpoint to get the value for a key
router.get('/store/:key', (req, res) => {
  const key = req.params.key;
  const value = ttlMap.get(key);

  if (value && value.ttl < Date.now()) {
    ttlMap.delete(key);
    res.json({ message: 'OK' });
  } else if (value) {
    res.json({ message: 'OK', value: value.value });
  } else {
    res.json({ message: 'OK', value: '' });
  }
});

// Endpoint to delete the value for a key
router.delete('/store/:key', (req, res) => {
  const key = req.params.key;

  if (ttlMap.store.size === 0) {
    res.status(200).json({ message: 'Store is empty' });
  } else {
    ttlMap.delete(key);
    res.status(200).json({ message: 'OK' });
  }
});

module.exports = router;
