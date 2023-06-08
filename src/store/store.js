let ttlMapInstance = null;

class TTLMap {
  constructor() {
    if (!ttlMapInstance) {
      ttlMapInstance = this;
      this.store = new Map();
    }

    return ttlMapInstance;
  }

  set(key, value, expirationTime = 30) {
    const ttl = Date.now() + expirationTime * 1000;
    this.store.set(key, { value, ttl });
  }

  get(key) {
    const item = this.store.get(key);
    if (item && item.ttl >= Date.now()) {
      return item.value;
    }
    return null;
  }

  has(key) {
    if (this.store.has(key)) {
      return true;
    }
  }

  delete(key) {
    this.store.delete(key);
  }
}

module.exports = new TTLMap();
