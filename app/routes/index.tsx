import { Link, useLoaderData, useLocation } from 'remix';
import { cms, Home, NavItem, Post } from '../cms';
import { getDrawings } from '../instagram';

type Content = {
  navigation: NavItem[];
  posts: Post[];
  home: Home;
};

export const loader = async (): Promise<Content> => {
  const navigation = await cms.getNavigation();
  const posts = await cms.getPosts();
  const home = await cms.getHome();

  return {
    navigation,
    posts,
    home,
  };
};

export default function Index() {
  const { navigation, posts, home } = useLoaderData<Content>();
  const location = useLocation();
  console.log(location);
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <header>
        <nav>
          <ul>
            {navigation.map((link: NavItem) => {
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
        {/* <h1>Welcome to Remix</h1> */}
        <img src={home.mePic} alt="Zach Urich" />

        <p>{home.intro}</p>

        <div>
          <ul>
            {posts.map((post) => {
              return (
                <li key={post.link}>
                  <Link to={post.link}>
                    <span>{post.title}</span>
                    <br></br>
                    <span>{post.date}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}
