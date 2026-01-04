self.addEventListener('push', event => {

  let data = {
    title: 'Notification',
    body: 'You have a new message'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      // fallback nếu payload không phải JSON
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body,
    icon: data.icon || '/favicon.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/' // dùng khi click notification
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title,  options)
  );
});

// ⬅️ PHẢI ĐẶT NGOÀI push listener
self.addEventListener('notificationclick', event => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});
