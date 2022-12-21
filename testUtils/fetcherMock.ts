import range from 'lodash/range';
import { Data as RepositoriesData } from '@api/useRepositoriesList';
import { Data as UserData } from '@api/useUsersList';

const fetcherMock = (url: string): UserData | RepositoriesData | null => {
  switch (url) {
    case 'https://api.github.com/search/users?q=John&per_page=5&page=0':
      return {
        items: [
          {
            login: 'Mark',
            url: 'http://markuser.com',
            id: 1,
          },
          {
            login: 'john',
            url: 'http://johnuser.com',
            id: 2,
          },
        ],
      };
    case 'https://api.github.com/search/users?q=Mark&per_page=5&page=0':
      return {
        items: [
          {
            login: 'Chris',
            url: 'http://chrisuser.com',
            id: 1,
          },
          {
            login: 'Adam',
            url: 'http://adamuser.com',
            id: 2,
          },
        ],
      };
    case 'https://api.github.com/users/john/repos?per_page=5&page=1':
      return range(1, 6).map(index => ({
        id: index,
        stargazers_count: index * 2,
        description: `Repo ${index} description`,
        name: `Repo ${index} name`,
        html_url: `http://john-repo${index}.com`,
      }));
    case 'https://api.github.com/users/john/repos?per_page=5&page=2':
      return range(6, 11).map(index => ({
        id: index,
        stargazers_count: index * 2,
        description: `Repo ${index} description`,
        name: `Repo ${index} name`,
        html_url: `http://john-repo${index}.com`,
      }));
    default:
      return null;
  }
};

export default fetcherMock;
