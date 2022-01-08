export default function Steps({ steps }) {
  return (
    <nav className='level'>
      <div className='level-item has-text-centered'>
        <div>
          <p className={`heading ${steps.login && 'has-text-primary'}`}>
            Login
          </p>
          {steps.login ? (
            <p className='icon subtitle has-text-primary'>
              <i className='far fa-check-circle'></i>
            </p>
          ) : (
            <p className='icon subtitle'>
              <i className='far fa-pause-circle'></i>
            </p>
          )}
        </div>
      </div>
      <div className='level-item has-text-centered'>
        <div>
          <p className={`heading ${steps.shipping && 'has-text-primary'}`}>
            Shipping Address
          </p>
          {steps.shipping ? (
            <p className='icon subtitle has-text-primary'>
              <i className='far fa-check-circle'></i>
            </p>
          ) : (
            <p className='icon subtitle'>
              <i className='far fa-pause-circle'></i>
            </p>
          )}
        </div>
      </div>
      <div className='level-item has-text-centered'>
        <div>
          <p className={`heading ${steps.payment && 'has-text-primary'}`}>
            Payment Method
          </p>
          {steps.payment ? (
            <p className='icon subtitle has-text-primary'>
              <i className='far fa-check-circle'></i>
            </p>
          ) : (
            <p className='icon subtitle'>
              <i className='far fa-pause-circle'></i>
            </p>
          )}
        </div>
      </div>
      <div className='level-item has-text-centered'>
        <div>
          <p className={`heading ${steps.order && 'has-text-primary'}`}>
            Place Order
          </p>
          {steps.order ? (
            <p className='icon subtitle has-text-primary'>
              <i className='far fa-check-circle'></i>
            </p>
          ) : (
            <p className='icon subtitle'>
              <i className='far fa-pause-circle'></i>
            </p>
          )}
        </div>
      </div>
    </nav>
  );
}
