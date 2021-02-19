export function generateIdFromTitle(title) {
  return title.toLowerCase().replace(/\s/g, "-")
}
