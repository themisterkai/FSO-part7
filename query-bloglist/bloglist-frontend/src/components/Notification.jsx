import { useContext, useEffect } from 'react';
import NotificationContext from '../NotificationContext';

const Notification = () => {
  const [notification, dispatch] = useContext(NotificationContext);
  const { message, isError } = notification;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'HIDE' });
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  if (message === '') {
    return null;
  }

  return (
    <div className={isError ? 'notification isError' : 'notification'}>
      {message}
    </div>
  );
};

export default Notification;

Notification.displayName = 'Notification';
