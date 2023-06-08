const express = require('express');
const router = new express.Router();
const stack = require('../stack/stack');

// Endpoint to add an item to the stack
router.post('/stack', (req, res) => {
  const item = req.body.item;
  stack.push(item);
  res.status(200).json({ message: 'OK' });
});

// Endpoint to return the top item of the stack
router.get('/stack', (req, res) => {
  if (stack.isEmpty()) {
    res.status(404).json({ message: 'Stack is empty' });
  } else {
    const topItem = stack.getTopItem();
    stack.pop(); // Remove the top item from the stack
    res.json({ item: topItem });
  }
});

module.exports = router;