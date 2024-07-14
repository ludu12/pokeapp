import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

export const NavLink = (props) => {
  const { href, text } = props;
  const router = useRouter();

  // /page/path => ["", "page", "path"]
  const paths = router.asPath.split('/').map(decodeURI);
  const root = paths.slice(0, 2).join('/');
  const isActive = href === root;

  return (
    <Link href={href} passHref className={isActive ? 'active' : ''}>
      {text}
    </Link>
  );
};

NavLink.propTypes = {
  href: PropTypes.string,
  text: PropTypes.string
};
