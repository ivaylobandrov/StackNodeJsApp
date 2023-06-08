let ttlMapInstance = null;

class TTLMap {
  constructor() {
    if (!ttlMapInstance) {
      ttlMapInstance = this;
      this.ttlMap = {};
    }

    return ttlMapInstance;
  }

  getTTLMap() {
    return this.ttlMap;
  }
}

module.exports = new TTLMap();