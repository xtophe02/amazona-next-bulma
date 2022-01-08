import {
  useDispatchStateContext,
  useStateContext,
} from '../context/stateContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function UserDynamic() {
  const { user } = useStateContext();
  // console.log(user);
  const dispatch = useDispatchStateContext();
  const router = useRouter();
  const NavLink = ({ children, href }) => (
    <Link href={href}>
      <a className='navbar-item'>{children}</a>
    </Link>
  );
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch({ type: 'REMOVE_USER' });
    router.push('/');
  };
  return user ? (
    <div className='navbar-item has-dropdown is-hoverable'>
      <a className='navbar-link'>{user.name}</a>

      <div className='navbar-dropdown'>
        <NavLink href='/user/orders'>My Orders</NavLink>
        <NavLink href='/user/profile'>My Profile</NavLink>
        {user.isAdmin && <NavLink href='/admin/dashboard'>Dashboard</NavLink>}

        <hr className='navbar-divider' />
        <a className='navbar-item has-text-danger' onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  ) : (
    <Link href='/login'>
      <a className='navbar-item'>
        <strong>Login</strong>
      </a>
    </Link>
  );
}
