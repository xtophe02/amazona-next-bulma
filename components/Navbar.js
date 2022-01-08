import Link from 'next/link';

import dynamic from 'next/dynamic';
import { useState } from 'react';

const CartDynamic = dynamic(() => import('./CartDynamic'), { ssr: false });
const UserDynamic = dynamic(() => import('./UserDynamic'), {
  ssr: false,
});
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const NavLink = ({ children, href }) => (
    <Link href={href}>
      <a className='navbar-item'>{children}</a>
    </Link>
  );

  return (
    <nav
      className='navbar is-fixed-top is-primary'
      role='navigation'
      aria-label='main navigation'
    >
      <div className='container'>
        <div className='navbar-brand'>
          <NavLink href='/'>
            <h3 className='title'>Amazona</h3>
          </NavLink>

          <a
            role='button'
            className='navbar-burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasicExample'
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </a>
        </div>

        <div
          id='navbarBasicExample'
          className={`navbar-menu ${open && 'is-active'}`}
        >
          <div className='navbar-start'></div>

          <div className='navbar-end'>
            <CartDynamic />

            <UserDynamic />
          </div>
        </div>
      </div>
    </nav>
  );
}
