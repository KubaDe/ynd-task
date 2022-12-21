import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockRouter from 'next-router-mock';
import singletonRouter from 'next/router';
import SearchBox from '../';

jest.mock('next/router', () => require('next-router-mock'));

describe('SearchBox', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('checks if submitting form by clicking button sets query', async () => {
    render(<SearchBox />);
    await userEvent.type(screen.getByPlaceholderText('Enter username'), 'John');
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(singletonRouter).toMatchObject({
      query: { q: 'John' },
    });
  });

  it('checks if submitting form by pressing enter sets query', async () => {
    render(<SearchBox />);
    await userEvent.type(
      screen.getByPlaceholderText('Enter username'),
      'Jack{enter}',
    );
    expect(singletonRouter).toMatchObject({
      query: { q: 'Jack' },
    });
  });

  it('checks if form loads query after refresh', async () => {
    mockRouter.setCurrentUrl('/?q=Mark');
    render(<SearchBox />);
    expect(screen.getByRole('textbox')).toHaveValue('Mark');
  });

  it('checks if exceeding max length shows error', async () => {
    render(<SearchBox />);
    await userEvent.type(
      screen.getByPlaceholderText('Enter username'),
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore{enter}',
    );
    expect(screen.getByText('Maximum length should be 32')).toBeVisible();
    expect(singletonRouter).toMatchObject({
      query: {},
    });
  });

  it('checks if clearing input removes q param from query', async () => {
    mockRouter.setCurrentUrl('/?q=Mark');
    render(<SearchBox />);
    await userEvent.clear(screen.getByPlaceholderText('Enter username'));
    await userEvent.click(screen.getByRole('button', { name: 'Search' }));
    expect(singletonRouter).toMatchObject({
      query: {},
    });
  });
});
