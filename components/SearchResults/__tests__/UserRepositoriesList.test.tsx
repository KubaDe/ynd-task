import SwrTestProvider from '@testUtils/SwrTestProvider';
import fetcherMock from '@testUtils/fetcherMock';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserRepositoriesList from '../UserRepositoriesList';

describe('UsersRepositoriesList', () => {
  it('checks if repositories are loaded', async () => {
    const fetcher = jest.fn();
    fetcher.mockImplementation(fetcherMock);
    render(
      <SwrTestProvider fetcher={fetcher}>
        <UserRepositoriesList username="john" isExpanded />
      </SwrTestProvider>,
    );
    expect(fetcher).toHaveBeenCalledWith(
      'https://api.github.com/users/john/repos?per_page=5&page=1',
    );
    expect(screen.getByRole('list').children).toHaveLength(2);
    await waitFor(() =>
      expect(screen.getByRole('list').children).toHaveLength(5),
    );
    expect(
      within(screen.getByRole('list').firstChild as HTMLElement).getByRole(
        'link',
        {
          name: 'Repo 1 name',
        },
      ),
    ).toHaveAttribute('href', 'http://john-repo1.com');
    expect(
      within(
        screen.getByRole('list').firstElementChild as HTMLElement,
      ).getByText('Repo 1 description'),
    ).toBeVisible();
    expect(
      within(
        screen.getByRole('list').firstElementChild as HTMLElement,
      ).getByLabelText('stars').parentElement,
    ).toHaveTextContent('2');
  });

  it('checks if load more loads data', async () => {
    const fetcher = jest.fn();
    fetcher.mockImplementation(fetcherMock);
    render(
      <SwrTestProvider fetcher={fetcher}>
        <UserRepositoriesList username="john" isExpanded />
      </SwrTestProvider>,
    );
    await waitFor(() =>
      expect(screen.getByRole('list').children).toHaveLength(5),
    );
    userEvent.click(screen.getByRole('button', { name: 'Show more' }));
    await waitFor(() =>
      expect(fetcher).toHaveBeenCalledWith(
        'https://api.github.com/users/john/repos?per_page=5&page=2',
      ),
    );
    await waitFor(() =>
      expect(screen.getByRole('list').children).toHaveLength(10),
    );
    expect(
      within(screen.getByRole('list').lastChild as HTMLElement).getByRole(
        'link',
        {
          name: 'Repo 10 name',
        },
      ),
    ).toHaveAttribute('href', 'http://john-repo10.com');
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
        <UserRepositoriesList username="john" isExpanded />
      </SwrTestProvider>,
    );
    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'The server was crashed',
      ),
    );
  });
});
