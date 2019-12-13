const Utils = {
  countSummary(value, callback) {
    const values = value.map(callback);
    const merged = [].concat(...values);
    const counts = {};
    merged.forEach(key => {
      counts[key] = (counts[key] || 0) + 1;
    });

    return counts;
  },
};
export default Utils;
