export function objectAssignDeep(target, ...sources) {
  function isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  sources.forEach(source => {
    Object.entries(source || {}).forEach(([key, value]) => {
      const targetValue = target[key];
      target[key] = isObject(value) ? objectAssignDeep(isObject(targetValue) ? structuredClone(targetValue) : {}, value) : structuredClone(value);
    });
  });
  return target;
}
