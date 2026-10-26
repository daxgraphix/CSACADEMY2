import { describe, expect, it, vi } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ScrollToHash } from './ScrollToHash';

const stubScroll = () => {
  vi.stubGlobal('scrollTo', vi.fn());
  if (typeof Element.prototype.scrollIntoView !== 'function') {
    Element.prototype.scrollIntoView = () => {};
  }
  vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
};

describe('ScrollToHash', () => {
  it('scrolls to the top when there is no hash', () => {
    stubScroll();
    const scrollTo = vi.mocked(window.scrollTo);

    render(
      <MemoryRouter initialEntries={['/pricing']}>
        <ScrollToHash />
      </MemoryRouter>
    );

    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'instant' });
  });

  it('scrolls to the hash target when present', async () => {
    stubScroll();
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);

    render(
      <MemoryRouter initialEntries={['/pricing#pricing-faq']}>
        <div>
          <ScrollToHash />
          <div id="pricing-faq">Pricing FAQ</div>
        </div>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalled();
    });
  });
});