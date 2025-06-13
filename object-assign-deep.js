export function objectAssignDeep(target, ...sources) {
  function isPlainObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  function safeStructuredClone(value) {
    try {
      return structuredClone(value);
    } catch {
      return value;
    }
  }
  sources.forEach(source => {
    Object.entries(source || {}).forEach(([key, value]) => {
      const targetValue = target[key];
      target[key] = isPlainObject(value) ? objectAssignDeep(isPlainObject(targetValue) ? safeStructuredClone(targetValue) : {}, value) : safeStructuredClone(value);
    });
  });
  return target;
}
