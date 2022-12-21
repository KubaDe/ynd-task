import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import SearchInfo from '../';

jest.mock('next/router', () => require('next-router-mock'));

describe('SearchInfo', () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl('/');
  });

  it('checks if info is shown for search phrase', async () => {
    mockRouter.setCurrentUrl('/?q=Mark');
    render(<SearchInfo />);
    expect(screen.getByText('Searching users for "Mark"')).toBeVisible();
  });

  it('checks if info is hidden for no results', async () => {
    const { container } = render(<SearchInfo />);
    expect(container).toBeEmptyDOMElement();
  });
});
