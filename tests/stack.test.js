const request = require('supertest');
const app = require('../src/app')

describe('Stack API', () => {

  describe('POST /stack', () => {
    it('should add an item to the stack', async () => {
      const response = await request(app)
        .post('/stack')
          .send('Hello')
          .expect(200);

      // Assertions
      expect(response.status).toBe(200);
    });
  });

  describe('GET /stack', () => {
    it('should return the top item of the stack', async () => {
      const response = await request(app)
        .get('/stack')
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
    });

    it('should return 404 if stack is empty', async () => {
      const response = await request(app)
        .get('/stack')
        .expect(404);

      // Assertions
      expect(response.text).toBe('Stack is empty');
    });
  });
});
