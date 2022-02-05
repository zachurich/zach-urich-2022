import { Link, useLoaderData, useLocation } from 'remix';
import { getNavigation, NavItem } from '../prismic';

type Content = {
  nav: NavItem[];
};

export const loader = async (): Promise<Content> => {
  const navigation = await getNavigation();
  return {
    nav: [
      {
        id: 'home',
        to: '/',
        text: 'zachurich.com',
      },
      ...navigation,
    ],
  };
};

export default function Index() {
  const cms = useLoaderData();
  const location = useLocation();
  console.log(location);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <header>
        <nav>
          <ul>
            {cms.nav.map((link: NavItem) => {
              if (link.external) {
                return (
                  <li key={link.id}>
                    <a href={link.to} target="_blank" rel="noreferrer">
                      {link.text}
                    </a>
                  </li>
                );
              }
              return (
                <li key={link.id}>
                  <Link
                    to={link.to}
                    aria-current={
                      location.pathname === link.to ? 'page' : undefined
                    }
                  >
                    {link.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main id="main-content">
        <h1>Welcome to Remix</h1>
      </main>
    </div>
  );
}
