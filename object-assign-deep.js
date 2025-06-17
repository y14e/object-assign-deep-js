export function objectAssignDeep(target, ...sources) {
  function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
  }
  function safeStructuredClone(value) {
    try {
      return structuredClone(value);
    } catch {
      return Array.isArray(value) ? [...value] : isPlainObject(value) ? objectAssignDeep({}, value) : value;
    }
  }
  sources.forEach(source => {
    if (!source || typeof source !== 'object') {
      return;
    }
    Object.entries(source).forEach(([key, value]) => {
      const targetValue = target[key];
      target[key] = isPlainObject(value) && isPlainObject(targetValue) ? objectAssignDeep(targetValue, value) : safeStructuredClone(value);
    });
  });
  return target;
}
