export function handleNotFound(err) {
  if (err.status === 404 || err.status === 400) {
    return 0
  } else {
    throw err
  }
}
