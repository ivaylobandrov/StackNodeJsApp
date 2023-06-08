const express = require('express');
const router = new express.Router();
const stack = require('../stack/stack');

// Endpoint to add an item to the stack
router.post('/stack', (req, res) => {
  const item = req.body.item;
  stack.push(item);
  return res.status(201).json({ message: 'Item added to the stack' });
});

// Endpoint to return the top item of the stack
router.get('/stack', (req, res) => {
  if (stack.isEmpty()) {
    return res.status(404).json({ message: 'Stack is empty' });
  } else {
    const topItem = stack.pop();
    return res.json({ value: topItem });
  }
});

module.exports = router;