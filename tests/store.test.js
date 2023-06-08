const request = require('supertest');
const app = require('../src/app');
const ttlMap = require('../src/store/store');

describe('Store API', () => {
  const mockData = {
    key: 'name',
    value: 'John',
    ttl: 30
  };

  beforeEach(() => {
    // Clear the store before each test
    ttlMap.store.clear();
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
      // Populate the store
      ttlMap.set(mockData.key, mockData.value, mockData.ttl);

      const response = await request(app)
        .get(`/store/${mockData.key}`)
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
    });

    it('should return an empty value for an expired key', async () => {
      // Set an expired key in the store
      ttlMap.set(mockData.key, mockData.value, -1);

      const response = await request(app)
        .get(`/store/${mockData.key}`)
        .expect(404);

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Timed out or not found" });
    });

    it('should return an empty value for an invalid key', async () => {
      const invalidKey = 'invalidKey';

      const response = await request(app)
        .get(`/store/${invalidKey}`)
        .expect(404);

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Timed out or not found" });
    });
  });

  describe('DELETE /store/:key', () => {
    it('should delete the value for a valid key', async () => {
      // Populate the store
      ttlMap.set(mockData.key, mockData.value, mockData.ttl);

      const response = await request(app)
        .delete(`/store/${mockData.key}`)
        .expect(200);

      // Assertions
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ message: "Item deleted successfully" });
    });

    it('should have no effect for an invalid key', async () => {
      ttlMap.set(mockData.key, mockData.value);

      const response = await request(app)
        .delete(`/store/invalidkey`)
        .expect(404);

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "No item found" });
    });

    it('should return store is empty if item is not saved to store', async () => {
      const response = await request(app)
        .delete(`/store/invalidkeyvalue`)
        .expect(404);

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: "Store is empty" });
    });
  });
});
