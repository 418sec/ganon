/**
 * Set a value at a specific path in an object
 *
 * @param {Object} obj The object we are setting a value in.
 * @param {String|Array} path The path we are setting the value to
 * @param {*} value
 *
 */

function set (obj, path, value) {
  if (obj == null) {
    return obj;
  }

  if (typeof path === "string") {
    path = path.split(".");
  }

  if (!Array.isArray(path)) {
    throw "Path should be a string or array";
  }

  let node = obj;
  const bound = path.length - 1;

  let i, key;
  for (i = 0; i < bound; i += 1) {
    key = path[i];
    if (key == "__proto__" || key === "constructor") {
      return obj;
    }
    if (node[key] === undefined) {
      node[key] = {};
    }
    node = node[key];
  }

  key = path[i];
  if (key == "__proto__" || (key === "constructor" && typeof node[key] === "function")) {
    return obj;
  }
  node[key] = value;

  return obj;
}

module.exports = set;
