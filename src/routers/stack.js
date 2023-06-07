const express = require('express');
const router = new express.Router();

const stack = [];

// Endpoint to add an item to the stack
router.post('/stack', (req, res) => {
  const item = req.body.item;
  stack.push(item);
  res.sendStatus(200)
});

// Endpoint to return the top item of the stack
router.get('/stack', (req, res) => {
  if (stack.length === 0) {
    res.status(404).send('Stack is empty');
  } else {
    const topItem = stack.pop();
    res.send(topItem);
  }
});

module.exports = router