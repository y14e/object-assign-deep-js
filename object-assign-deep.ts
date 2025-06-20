type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

export function objectAssignDeep<T extends object, U extends object[]>(target: T, ...sources: U): T & UnionToIntersection<U[number]> {
  function isPlainObject(value: unknown): value is Record<string, any> {
    return Object.prototype.toString.call(value) === '[object Object]';
  }
  function safeStructuredClone<T>(value: T): T {
    try {
      return structuredClone(value);
    } catch {
      return Array.isArray(value) ? ([...value] as T) : isPlainObject(value) ? (objectAssignDeep({}, value) as T) : value;
    }
  }
  sources.forEach(source => {
    if (!source || typeof source !== 'object') {
      return;
    }
    Object.entries(source).forEach(([key, value]) => {
      const targetValue = target[key as keyof T];
      target[key as keyof T] = isPlainObject(value) && isPlainObject(targetValue) ? objectAssignDeep(targetValue, value) : safeStructuredClone(value);
    });
  });
  return target as T & UnionToIntersection<U[number]>;
}
