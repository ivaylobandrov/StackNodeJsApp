const express = require('express');
const router = new express.Router();
const ttlMap = require('../store/store');

// Endpoint to add a key-value pair to the store
router.post('/store', (req, res) => {
  const key = req.body.key;
  const value = req.body.value;
  const ttl = req.body.ttl ? req.body.ttl : 30;

  ttlMap.set(key, value, ttl);

  return res.status(200).json({ message: 'Item added successfully' });
});

// Endpoint to get the value for a key
router.get('/store/:key', (req, res) => {
  const key = req.params.key;
  const value = ttlMap.get(key);

  if (!value) {
    return res.status(404).json({ message: 'Timed out or not found' });
  } else {
    return res.json({ message: 'OK', value: value });
  }
});

// Endpoint to delete the value for a key
router.delete('/store/:key', (req, res) => {
  const key = req.params.key;

  if (ttlMap.store.size === 0) {
    return res.status(404).json({ message: 'Store is empty' });
  }

  if (!ttlMap.has(key)) {
    return res.status(404).json({ message: 'No item found' });
  }
  else {
    ttlMap.delete(key);
    return res.status(200).json({ message: 'Item deleted successfully' });
  }
});

module.exports = router;
