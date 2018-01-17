export const normalizeVcode = (value, previousValue) => (value && ((/^\d+$/.test(value) && value.length <= 6) ? value.trim() : previousValue))
