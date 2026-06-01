import { ApolloClient, InMemoryCache, ApolloLink, Observable, makeVar } from '@apollo/client';

const PROFILE_KEY = 'sectionC-profile';
const LINKS_KEY = 'sectionC-links';

const loadJson = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const defaultProfile = {
  name: 'Creator Name',
  bio: 'Add a short bio about yourself and let visitors know who you are.',
};

const defaultLinks = [
  {
    id: '1',
    title: 'My Portfolio',
    url: 'https://example.com',
  },
];

export const profileVar = makeVar(loadJson(PROFILE_KEY, defaultProfile));
export const linksVar = makeVar(loadJson(LINKS_KEY, defaultLinks));

export const saveProfile = (profile) => {
  profileVar(profile);
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const saveLinks = (links) => {
  linksVar(links);
  localStorage.setItem(LINKS_KEY, JSON.stringify(links));
};

const localLink = new ApolloLink((operation) =>
  new Observable((observer) => {
    const { operationName, variables } = operation;

    try {
      let data;

      switch (operationName) {
        case 'GetProfile':
          data = { profile: profileVar() };
          break;
        case 'GetLinks':
          data = { links: linksVar() };
          break;
        case 'UpdateProfile': {
          const updated = {
            ...profileVar(),
            ...variables.input,
          };
          saveProfile(updated);
          data = { updateProfile: updated };
          break;
        }
        case 'AddLink': {
          const validUrl = /^(https?:\/\/)[^\s]+$/i.test(variables.input.url);
          if (!validUrl) {
            throw new Error('Invalid URL format. Please include http:// or https://');
          }
          const nextLink = {
            id: String(Date.now()),
            ...variables.input,
          };
          const nextLinks = [...linksVar(), nextLink];
          saveLinks(nextLinks);
          data = { addLink: nextLink };
          break;
        }
        default:
          throw new Error(`Unsupported operation: ${operationName}`);
      }

      observer.next({ data });
      observer.complete();
    } catch (error) {
      observer.error(error);
    }

    return () => {};
  }),
);

const cache = new InMemoryCache();

export const client = new ApolloClient({
  cache,
  link: localLink,
  name: 'section-c-client',
});
