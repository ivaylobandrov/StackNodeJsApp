let ttlMapInstance = null;

class TTLMap {
  constructor() {
    if (!ttlMapInstance) {
      ttlMapInstance = this;
      this.store = new Map();
    }

    return ttlMapInstance;
  }

  set(key, value, ttl = 30) {
    const expirationTime = Date.now() + ttl * 1000;
    this.store.set(key, { value, ttl: expirationTime });
  }

  get(key) {
    const item = this.store.get(key);
    if (item && item.ttl >= Date.now()) {
      return item.value;
    }
    return null;
  }

  delete(key) {
    this.store.delete(key);
  }
}

module.exports = new TTLMap();
