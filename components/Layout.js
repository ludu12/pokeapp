import Head from 'next/head';
import React from 'react';
import classes from '../styles/Layout.module.css';
import { NavLink } from './NavLink';

export const Layout = (props) => {
  const { title, children } = props;

  const displayTitle = `Pokèmon Deck Builder - ${title}`;

  return (
    <>
      <Head>
        <title>{displayTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <div className={classes.app}>
        <header className={classes.header}>
          <div className={classes.brand}>
            <h1>{displayTitle}</h1>
            <div>
              <img src={'/pokemon.png'} alt="Pokèmon gotta catch 'em all" />
            </div>
          </div>
          <nav className={classes.nav}>
            <NavLink href="/" text={'Home'} />
            <NavLink href="/generations" text={'Generations'} />
            <NavLink href="/my-deck" text={'My Deck'} />
          </nav>
        </header>
        <main className={classes.main}>{children}</main>
        <footer className={classes.footer}>
          <img src={'/pokemon.png'} alt="Pokèmon gotta catch 'em all" />
        </footer>
      </div>
    </>
  );
};
