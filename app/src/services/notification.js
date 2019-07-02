export function createNotification({ title, message }) {
  new Notification(title, {
    body: message,
    icon: ''
  })
}
