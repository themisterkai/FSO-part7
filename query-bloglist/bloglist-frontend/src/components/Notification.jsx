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
    <div
      className={
        isError
          ? 'flex items-center bg-gray-700 text-white text-sm font-bold px-4 py-3" role="alert"'
          : 'flex items-center bg-teal-600 text-white text-sm font-bold px-4 py-3" role="alert"'
      }
    >
      <p className="font-bold">{message}</p>
    </div>
  );
};

export default Notification;

Notification.displayName = 'Notification';
