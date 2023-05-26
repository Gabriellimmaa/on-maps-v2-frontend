export function removeMatchingAttributes(obj1: any, obj2: any): void {
  for (const key in obj1) {
    if (
      obj1.hasOwnProperty(key) &&
      obj2.hasOwnProperty(key) &&
      obj1[key] === obj2[key]
    ) {
      delete obj1[key]
    }
  }
}
