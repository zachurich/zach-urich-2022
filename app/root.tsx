import { ReactNode, useEffect, useRef, useState } from 'react';
import { MetaFunction, LinksFunction, useCatch } from 'remix';
import type { NavItem } from './cms';

import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from 'remix';

import classNames from 'classnames';

import {
  AnimationContext,
  AnimationStateType,
  initialAnimationState,
} from '~/animation';
import { cms } from '~/cms';

import styles from '~/styles/global.css';

type Content = {
  navigation: NavItem[];
};

export const loader = async (): Promise<Content> => {
  const navigation = await cms.getNavigation();

  return {
    navigation,
  };
};

export const links: LinksFunction = () => {
  return [
    {
      rel: 'stylesheet',
      href: styles,
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
      // crossOrigin: 'anonymous',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@600;700;800&family=Roboto+Mono:ital,wght@0,400;0,700;1,700&display=swap',
    },
  ];
};

export const meta: MetaFunction = () => {
  return { title: 'zachurich.com' };
};

function Header({ data }: { data: NavItem[] }) {
  const location = useLocation();
  return (
    <header className="site-header container">
      <Link
        className={classNames('home-link', {
          'navigation-item--current': location.pathname === '/',
        })}
        to="/"
        aria-current={location.pathname === '/' ? 'page' : undefined}
        prefetch="intent"
      >
        zachurich.com
      </Link>
      <nav id="navigation" className="primary-navigation">
        <ul className="navigation-items">
          {data.map((link: NavItem) => {
            if (link.external) {
              return (
                <li className="navigation-item" key={link.id}>
                  <a href={link.to} target="_blank" rel="noreferrer">
                    {link.text}
                  </a>
                </li>
              );
            }
            return (
              <li
                className={classNames('navigation-item', {
                  'navigation-item--current': location.pathname === link.to,
                })}
                key={link.id}
              >
                <Link
                  to={link.to}
                  aria-current={
                    location.pathname === link.to ? 'page' : undefined
                  }
                  prefetch="intent"
                >
                  {link.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>Copyright {new Date().getFullYear()}</p>
    </footer>
  );
}

function Document({ children }: { children: ReactNode }) {
  // Attempt with client-side routing focus issues
  // https://kittygiraudel.com/2020/01/15/accessible-title-in-a-single-page-react-application/
  const [announceTitle, setAnnounceTitle] = useState<string | undefined>();
  const { hash, pathname } = useLocation();
  const initialFocusRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const initialFocus = initialFocusRef.current;
    if (initialFocus && document.title && !location.hash) {
      setAnnounceTitle(document.title);
      initialFocus.focus();
    }
  }, [pathname, hash]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <span className="hidden" ref={initialFocusRef} tabIndex={-1}>
          {announceTitle}
        </span>

        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload />}
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  let errorMsg = 'something went very wrong';
  if (caught.status === 404) {
    errorMsg = 'page not found';
  }

  return (
    <Document>
      <div className="site-wrapper error-page">
        <main tabIndex={-1} id="main-content" aria-labelledby="page-header">
          <section className="page-content error-content">
            <h1 id="page-header">{errorMsg}</h1>
            <Link to="/" prefetch="intent">
              return home
            </Link>
          </section>
        </main>
      </div>
    </Document>
  );
}

export function ErrorBoundary() {
  return (
    <Document>
      <div className="site-wrapper error-page">
        <main tabIndex={-1} id="main-content" aria-labelledby="page-header">
          <section className="page-content error-content">
            <h1 id="page-header">something went very wrong...</h1>
            <Link to="/" prefetch="intent">
              return home
            </Link>
          </section>
        </main>
      </div>
    </Document>
  );
}

export default function App() {
  const { navigation } = useLoaderData<Content>();
  const [animationValues, setAnimationValues] = useState<AnimationStateType>(
    initialAnimationState,
  );
  return (
    <Document>
      <a className="focus-only" href="#main-content">
        Skip to main content
      </a>
      <div className="site-wrapper">
        <Header data={navigation} />
        <main tabIndex={-1} id="main-content" aria-labelledby="page-header">
          <AnimationContext.Provider
            value={{
              ...animationValues,
              updateValues: (newValues) =>
                setAnimationValues((values) => ({ ...values, ...newValues })),
            }}
          >
            <Outlet />
          </AnimationContext.Provider>
        </main>
        <Footer />
      </div>
    </Document>
  );
}
