/**
 * Map
 */
class LRUCache {
  constructor(length) {
    this.length = length;
    this._map = new Map();
  }
  has(key) {
    return this._map.has(key);
  }
  get(key) {
    if (!this._map.has(key)) return null;
    const value = this._map.get(key);
    this._map.delete(key);
    this._map.set(key, value);
    return value;
  }
  set(key, value) {
    if (this._map.has(key)) {
      this._map.delete(key);
    }
    if (this._map.size >= this.length) {
      this._map.delete(this._map.keys().next().value);
    }
    this._map.set(key, value);
    return this._map;
  }
}

/**
 * Set
 */
class LRUCache_Set {
  constructor(length) {
    this.length = length;
    this._set = new Set();
  }
  has(key) {
    return this._set.has(key);
  }
  get(key) {
    if (!this._set.has(key)) return null;
    const value = this._set.get(key);
    this._set.delete(key);
    this._set.set(key, value);
    return value;
  }
  set(key, value) {
    if (this._set.has(key)) {
      this._set.delete(key);
    }
    if (this._set.size >= this.length) {
      this._set.delete(this._set.keys().next().value);
    }
    this._set.add(key);
    return this._set;
  }
}

const lru = new LRUCache(2);
console.log(lru.set('0', '0'));
console.log(lru.set('1', '1'));
console.log(lru.set('2', '2'));
console.log(lru.set('3', '3'));
console.log(lru.set('2', '2'));

const lru_Set = new LRUCache_Set(3);
console.log(lru_Set.set('0', '0'));
console.log(lru_Set.set('1', '1'));
console.log(lru_Set.set('2', '2'));
console.log(lru_Set.set('3', '3'));
console.log(lru_Set.set('2', '2'));
