import SwrTestProvider from '@testUtils/SwrTestProvider';
import fetcherMock from '@testUtils/fetcherMock';
import { render, screen, waitFor } from '@testing-library/react';
import UsersList from '../UsersList';

jest.mock('next/router', () => require('next-router-mock'));

describe('UsersList', () => {
  it('checks if users are loaded', async () => {
    const fetcher = jest.fn();
    fetcher.mockImplementation(fetcherMock);
    render(
      <SwrTestProvider fetcher={fetcher}>
        <UsersList searchString="John" />
      </SwrTestProvider>,
    );
    expect(fetcher).toHaveBeenCalledWith(
      'https://api.github.com/search/users?q=John&per_page=5&page=0',
    );
    expect(screen.getByText('Loading...')).toBeVisible();
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());
    expect(screen.getByRole('button', { name: 'Mark' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'john' })).toBeVisible();
  });

  it('checks if list is refreshed', async () => {
    const fetcher = jest.fn();
    fetcher.mockImplementation(fetcherMock);
    const { rerender } = render(
      <SwrTestProvider fetcher={fetcher}>
        <UsersList searchString="John" />
      </SwrTestProvider>,
    );
    expect(fetcher).toHaveBeenCalledWith(
      'https://api.github.com/search/users?q=John&per_page=5&page=0',
    );
    await waitFor(() => expect(screen.queryByText('Loading...')).toBeNull());

    rerender(
      <SwrTestProvider fetcher={fetcher}>
        <UsersList searchString="Mark" />
      </SwrTestProvider>,
    );
    await waitFor(() =>
      expect(fetcher).toHaveBeenCalledWith(
        'https://api.github.com/search/users?q=Mark&per_page=5&page=0',
      ),
    );
    expect(screen.getByRole('button', { name: 'Chris' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Adam' })).toBeVisible();
  });

  it('checks if server error message is visible', async () => {
    const fetcher = jest.fn();
    fetcher.mockImplementation(() => {
      const error = new Error(String(500));
      error.cause = { message: 'The server was crashed' };
      throw error;
    });
    render(
      <SwrTestProvider fetcher={fetcher}>
        <UsersList searchString="Mark" />
      </SwrTestProvider>,
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'The server was crashed',
      ),
    );
  });
});
