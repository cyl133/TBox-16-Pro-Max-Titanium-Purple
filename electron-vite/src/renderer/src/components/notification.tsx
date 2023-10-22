import React from 'react'

// const NotificationButton = () => {

//   return <button onClick={showNotification}>Trigger Notification</button>
// }

export const showNotification = () => {
  if (!('Notification' in window)) {
    console.error('This browser does not support desktop notifications.')
  } else if (Notification.permission === 'granted') {
    // If it's okay, let's create a notification
    new Notification('Hello!', {
      body: 'This is your notification message.'
    })
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification('Hello!', {
          body: 'This is your notification message.'
        })
      }
    })
  }
}

// export default NotificationButton
