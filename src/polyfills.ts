// Polyfills for older Safari versions (iOS 14-16) to support modern pdfjs-dist
if (!(Map.prototype as any).getOrInsertComputed) {
  (Map.prototype as any).getOrInsertComputed = function (key: any, callback: (key: any) => any) {
    if (this.has(key)) return this.get(key);
    const value = callback(key);
    this.set(key, value);
    return value;
  };
}

if (!(WeakMap.prototype as any).getOrInsertComputed) {
  (WeakMap.prototype as any).getOrInsertComputed = function (key: any, callback: (key: any) => any) {
    if (this.has(key)) return this.get(key);
    const value = callback(key);
    this.set(key, value);
    return value;
  };
}

if (!(Promise as any).withResolvers) {
  (Promise as any).withResolvers = function () {
    let resolve, reject;
    const promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    return { promise, resolve, reject };
  };
}

if (!Array.prototype.at) {
  Array.prototype.at = function (index) {
    let i = Math.trunc(index) || 0;
    if (i < 0) i += this.length;
    if (i < 0 || i >= this.length) return undefined;
    return this[i];
  };
}

if (!String.prototype.at) {
  String.prototype.at = function (index) {
    let i = Math.trunc(index) || 0;
    if (i < 0) i += this.length;
    if (i < 0 || i >= this.length) return undefined;
    return String(this).charAt(i);
  };
}

if (!Object.hasOwn) {
  Object.hasOwn = function (obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  };
}
