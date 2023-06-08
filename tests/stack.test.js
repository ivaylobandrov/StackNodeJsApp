const request = require('supertest');
const app = require('../src/app');
const stack = require('../src/stack/stack');

describe('Stack API', () => {
  describe('POST /stack', () => {
    it('should add an item to the stack', async () => {
      const itemToAdd = 'Hello';
      const response = await request(app)
        .post('/stack')
        .send({ item: itemToAdd })
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
      expect(stack.stack[0]).toBe(itemToAdd);
    });
  });

  describe('GET /stack', () => {
    it('should return the top item of the stack', async () => {
      stack.stack.push('Hello'); // Add item to the stack

      const response = await request(app)
        .get('/stack')
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
      expect(stack.stack[0]).toBe('Hello');
    });

    it('should return 404 if stack is empty', async () => {
      stack.stack.length = 0; // Empty the stack

      const response = await request(app)
        .get('/stack')
        .expect(404);

      // Assertions
      expect(response.body).toEqual({ message: 'Stack is empty' });
    });
  });
});
