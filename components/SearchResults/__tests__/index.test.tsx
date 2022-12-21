import SwrTestProvider from '@testUtils/SwrTestProvider';
import fetcherMock from '@testUtils/fetcherMock';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import UsersList from '@components/SearchResults/UsersList';

jest.mock('next/router', () => require('next-router-mock'));
window.scrollTo = jest.fn();

describe('SearchResults', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('checks if repositories are fetched after expanding user accordion', async () => {
    const fetcher = jest.fn();
    fetcher.mockImplementation(fetcherMock);
    render(
      <SwrTestProvider fetcher={fetcher}>
        <UsersList searchString="John" />
      </SwrTestProvider>,
    );
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
    userEvent.click(screen.getByRole('button', { name: 'john' }));
    await waitFor(() =>
      expect(fetcher).toHaveBeenCalledWith(
        'https://api.github.com/users/john/repos?per_page=5&page=1',
      ),
    );
    await waitFor(() =>
      expect(screen.getByRole('list').children).toHaveLength(5),
    );
  });
});
