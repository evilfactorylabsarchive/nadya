export function createNotification({ title, message }) {
  new Notification(title, {
    body: message,
    icon: '/images/icons/icon-384x384.png'
  })
}
