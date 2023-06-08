let ttlMapInstance = null;

class TTLMap {
  constructor() {
    if (!ttlMapInstance) {
      ttlMapInstance = this;
      this.ttlMap = new Map();
    }

    return ttlMapInstance;
  }
}

module.exports = new TTLMap();