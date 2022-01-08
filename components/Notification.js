import { useNotificationCtx } from '../context/stateContext';

function Notification(props) {
  const { hideNotification } = useNotificationCtx();

  const { title, message, status } = props;

  return (
    <div
      className={`notification ${status} is-light is-flex is-justify-content-space-between`}
      style={{ position: 'fixed', top: 52, left: 0, width: '100%' }}
    >
      <button onClick={hideNotification} className='delete'></button>
      <h2 className='is-capitalized'>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
