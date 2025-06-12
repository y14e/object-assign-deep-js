export function objectAssignDeep(target: {}, ...sources: any[]): any {
  function isNonArrayObject(value: any): boolean {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }
  function safeStructuredClone(value: any): any {
    try {
      return structuredClone(value);
    } catch {
      return value;
    }
  }
  sources.forEach(source => {
    Object.entries(source || {}).forEach(([key, value]) => {
      const targetValue = (target as any)[key];
      (target as any)[key] = isNonArrayObject(value) ? objectAssignDeep(isNonArrayObject(targetValue) ? safeStructuredClone(targetValue) : {}, value) : safeStructuredClone(value);
    });
  });
  return target;
}
