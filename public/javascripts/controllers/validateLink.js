export const validateLink = link => {
  const matches = link.match(
    /^http[s]?:\/\/(?:www.)?reddit\.com\/r\/AmItheAsshole\/comments\/(?:[a-z0-9]+)\/(?:[a-z0-9_]+)/i
  )
  if (matches) {
    return true
  } else {
    return false
  }
}
