export function generateIdFromTitle(title) {
  return title.toLowerCase().replace(/[^a-zA-Z]/g, "-")
}
