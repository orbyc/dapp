import { NotificationContext, removeNotification } from "context/notification";
import React, { useContext } from "react";

export const Notifications = () => {
  const { state: notifications, dispatch } = useContext(NotificationContext);

  const handleRemove = (index: number) => () => dispatch(removeNotification(index));

  return (
    <ul style={{ position: "absolute" }}>
      {notifications.map((notification, index) => (
        <li key={index} onClick={handleRemove(index)}>
          {notification.type} {notification.message}
        </li>
      ))}
    </ul>
  );
};
