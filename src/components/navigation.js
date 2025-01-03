import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useContext } from 'react';

import { NearContext } from '@/wallets/near';
import MentalaLogo from '/public/mentala.png';

import styles from '@/styles/app.module.css';

export const Navigation = () => {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [action, setAction] = useState(() => { });
  const [label, setLabel] = useState('Loading...');

 // login/logout button using the signIn and signOut methods from the wallet selector
  useEffect(() => {
    if (!wallet) return;

    if (signedAccountId) {
      setAction(() => wallet.signOut);
      setLabel(`Logout ${signedAccountId}`);
    } else {
      setAction(() => wallet.signIn);
      setLabel('Login');
    }
  }, [signedAccountId, wallet]);

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link href="/" passHref legacyBehavior>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Image priority src={MentalaLogo} alt="Mentala Logo" width="51" height="51" className="d-inline-block align-text-top" />
            <span className={`${styles['navbar-brand']} mb-0 h1 ms-2`}>1000 FANS</span>
          </div>
        </Link>
        <div className={`${styles['navbar-nav']} pt-1`}>
          <Link href="/shop" passHref legacyBehavior>
            <a className={`${styles['nav-link']} ${styles['nav-link-shop']}`}>Shop</a>
          </Link>
          <button className="btn btn-secondary" onClick={action} > {label} </button>
        </div>
      </div>
    </nav>
  );
};