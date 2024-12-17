import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Notification = ({ notification, setNotification }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification('');
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification, setNotification]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  if (notification === '') return null;

  return <div style={style}>{notification}</div>;
};

export default Notification;

Notification.propTypes = {
  notification: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired,
};
