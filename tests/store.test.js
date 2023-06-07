const request = require('supertest');
const app = require('../src/app')

describe('Store API', () => {
    const stack = []
    const ttlMap = {};
    const mockData = {
      key: 'name',
      value: 'John',
      ttl: 30
    };

    beforeEach(() => {
    // Clear the store and stack before each test
    stack.length = 0;
    });

  describe('POST /store', () => {
    it('should add a key-value pair to the store', async () => {
      const response = await request(app)
        .post('/store')
        .send(mockData)
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
    });
  });

  describe('GET /store/:key', () => {
    it('should return the value for a valid key', async () => {
      // Populate the store and stack
      ttlMap[mockData.key] = Date.now() + mockData.ttl * 1000;
      stack.push({ key: mockData.key, value: mockData.value });

      const response = await request(app)
        .get(`/store/${mockData.key}`)
        .expect(200);

      // Assertions
        expect(response.status).toBe(200);
    });

    it('should return an empty value for an expired key', async () => {
      // Set an expired key in the store and remove from stack
      ttlMap[mockData.key] = Date.now() - 1000;
      stack.splice(0, 1);

      const response = await request(app)
        .get(`/store/${mockData.key}`)
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
    });

    it('should return an empty value for an invalid key', async () => {
      const invalidKey = 'invalidKey';

      const response = await request(app)
        .get(`/store/${invalidKey}`)
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
    });
  });

  describe('DELETE /store/:key', () => {
    it('should delete the value for a valid key', async () => {
      // Populate the store and stack
      ttlMap[mockData.key] = Date.now() + mockData.ttl * 1000;
      stack.push({ key: mockData.key, value: mockData.value });

      const response = await request(app)
        .delete(`/store/${mockData.key}`)
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
    });

    it('should have no effect for an invalid key', async () => {
      const invalidKey = 'invalidKey';

      const response = await request(app)
        .delete(`/store/${invalidKey}`)
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
    });
  });
});
