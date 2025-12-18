export function parseNumber(value?:string) {
  if(!value) return 0;

  return parseFloat(value.replace(/\./g, "").replace(/\,/g, ".")) || 0
}
