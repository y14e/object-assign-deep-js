function objectAssignDeep(target: {}, ...sources: any[]): any {
  const isObject = (value: any): boolean => value !== null && typeof value === 'object' && !Array.isArray(value);
  sources.forEach(source => {
    Object.entries(source || {}).forEach(([key, value]) => {
      const targetValue = (target as any)[key];
      (target as any)[key] = isObject(value) ? objectAssignDeep(isObject(targetValue) ? structuredClone(targetValue) : {}, value) : structuredClone(value);
    });
  });
  return target;
}

export { objectAssignDeep };
