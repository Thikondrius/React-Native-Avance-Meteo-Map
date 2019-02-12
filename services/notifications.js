import { Permissions, Notifications } from "expo";

export const subscribeToPushNotification = () => {
  Permissions.getAsync(Permissions.NOTIFICATIONS)
    .then(existingPermission => {
      if (existingPermission.status !== "granted") {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(permission => {
          if (permission.status !== "granted") {
            return;
          } else {
            Notifications.getExpoPushTokenAsync().then(token => {
              console.log(" the token to send notification is ", token);
            });
          }
        });
      } else {
        Notifications.getExpoPushTokenAsync().then(token => {
          console.log(" the token to send notification is ", token);
        });
      }

      // Stop here if the user did not grant permissions
    })
    .catch(err => console.log(" erreur ", err));
};
