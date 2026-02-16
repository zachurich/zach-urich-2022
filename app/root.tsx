import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { type LinksFunction, type MetaFunction } from 'react-router';

import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  useLoaderData,
  useLocation,
  isRouteErrorResponse,
} from 'react-router';

import type { NavItem } from './cms';

import classNames from 'classnames';

// import type { AnimationStateType } from './animation';
// import { initialAnimationState } from './animation';
import { cms } from '~/cms';

import '~/styles/global.css';

const THEMES = ['default', 'orange', 'blue', 'green'] as const;
const ENABLE_THEME_TOGGLE = false;

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
    // {
    //   rel: 'stylesheet',
    //   href: styles,
    // },
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
  return [{ title: 'zachurich.com' }];
};

function Header({
  data,
  setTheme,
}: {
  data: NavItem[];
  setTheme: React.Dispatch<React.SetStateAction<(typeof THEMES)[number]>>;
}) {
  const location = useLocation();

  const onSamePageLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const path = new URL(e.currentTarget.href).pathname;
    if (path === location.pathname) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <header className="site-header">
      <div className="container">
        {ENABLE_THEME_TOGGLE && (
          <div className="theme-toggle">
            {THEMES.map((themeOption) => (
              <button
                key={themeOption}
                className={`theme-switch theme-${themeOption}-button`}
                onClick={() => setTheme(themeOption)}
              ></button>
            ))}
          </div>
        )}
        <Link
          className={classNames('home-link', {
            'navigation-item--current': location.pathname === '/',
          })}
          to="/"
          onClick={onSamePageLinkClick}
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
                    onClick={onSamePageLinkClick}
                    prefetch="render"
                  >
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div>Copyright {new Date().getFullYear()}</div>
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

  // const [animationValues, setAnimationValues] = useState<AnimationStateType>(
  //   initialAnimationState,
  // );

  // const context: AnimationStateType = {
  //   ...animationValues,
  //   updateValues: (newValues) =>
  //     setAnimationValues((values) => ({ ...values, ...newValues })),
  // };

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
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useRouteError();
  let errorMsg = 'something went very wrong';
  if (isRouteErrorResponse(caught) && caught.status === 404) {
    errorMsg = 'page not found';
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(caught);
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
  const caught = useRouteError();

  if (process.env.NODE_ENV === 'development') {
    console.log(caught);
  }

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
  const [theme, setTheme] = useState<(typeof THEMES)[number]>('default');

  return (
    <Document>
      <div className={`root ${theme}-theme`}>
        {/* <div className="overlay" aria-hidden="true" /> */}
        <a className="focus-only" href="#main-content">
          Skip to main content
        </a>
        <Header data={navigation} setTheme={setTheme} />
        <div className="site-wrapper">
          <main tabIndex={-1} id="main-content" aria-labelledby="page-header">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </Document>
  );
}
