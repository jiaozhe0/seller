export function saveToLocal(id, key, value) {
  let seller = localStorage.__seller__; // seller包含所有不同id的seller
  // 如果还没有创建seller
  if (!seller) {
    seller = {};
    seller[id] = {}; // 不同id的对象 如 id = 1;
  } else { // 如果以及创建了seller,但是不同id的seller对象
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  localStorage.__seller__ = JSON.stringify(seller);
};

export function loadFromLocal (id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  };
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  };
  let ret = seller[key];
  return ret || def;
}
