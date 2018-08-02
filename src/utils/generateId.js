let lastId = 5;

export default function () {
  return lastId++;
}

export function generateTagId(tags) {
  return ++Object.keys(tags).length
}