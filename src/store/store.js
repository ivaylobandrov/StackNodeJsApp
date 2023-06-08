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
}

module.exports = new TTLMap();
