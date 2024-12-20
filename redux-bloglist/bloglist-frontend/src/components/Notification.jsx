import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector(state => state.notification);
  const { text, isError } = notification;

  if (text == '') {
    return null;
  }
  return (
    <div className={isError ? 'notification isError' : 'notification'}>
      {text}
    </div>
  );
};

export default Notification;

Notification.displayName = 'Notification';
