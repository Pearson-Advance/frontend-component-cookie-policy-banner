import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import CookiePolicyBanner from '.';
import {
  ENGLISH_IETF_TAG,
  ENGLISH_LANGUAGE_CODE,
  IETF_TAGS_TO_CONTAINER_ROLE_LABEL,
  getPolicyHTML,
} from '../constants';
import {
  getIETFTag,
  hasViewedCookieBanner,
  createHasViewedCookieBanner,
} from '../utilities';

jest.mock('@openedx/paragon', () => ({
  // eslint-disable-next-line react/prop-types
  PageBanner: ({ children, onDismiss, closeButtonAriaLabel }) => (
    <div className="pgn__page-banner">
      <div className="pgn__page-banner-content">{children}</div>
      {onDismiss && (
        <button
          type="button"
          aria-label={closeButtonAriaLabel || 'Close'}
          onClick={onDismiss}
        >
          Close
        </button>
      )}
    </div>
  ),
}));

jest.mock('../utilities');
jest.mock('../constants');
jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    LMS_BASE_URL: 'http://localhost:18000',
    COOKIE_POLICY_COOKIE_DOMAIN: 'http://localhost:18000',
    SESSION_COOKIE_DOMAIN: 'http://localhost:18000',
    LANGUAGE_PREFERENCE_COOKIE_NAME: 'en',
  })),
  subscribe: jest.fn(() => { }),
}));

describe('CookiePolicyBanner', () => {
  let props;
  let isOpen;
  let onClose;

  const expectedTag = ENGLISH_IETF_TAG;
  const expectedLanguageCode = ENGLISH_LANGUAGE_CODE;
  const expectedWrapperAriaLabel = IETF_TAGS_TO_CONTAINER_ROLE_LABEL[expectedTag];
  const expectedPolicyHTML = 'Test cookie message content';

  beforeEach(() => {
    onClose = jest.fn();
    props = { onClose };
    isOpen = undefined;

    createHasViewedCookieBanner.mockClear();
    getIETFTag.mockClear();
    getPolicyHTML.mockClear();
    hasViewedCookieBanner.mockClear();

    createHasViewedCookieBanner.mockImplementation(() => { });
    getIETFTag.mockImplementation(() => expectedTag);
    getPolicyHTML.mockImplementation(() => expectedPolicyHTML);
    hasViewedCookieBanner.mockImplementation(() => !isOpen);
  });

  it('empty component when banner has already been viewed', async () => {
    isOpen = false;

    render(<CookiePolicyBanner {...props} />);

    await waitFor(() => {
      expect(screen.queryByRole('complementary')).toBeNull();
    });
  });

  it('banner component when open and renders HTML content', async () => {
    isOpen = true;

    render(<CookiePolicyBanner {...props} />);

    await waitFor(() => {
      const wrapperDiv = screen.getByRole('complementary');
      expect(wrapperDiv).toHaveAttribute('lang', expectedLanguageCode);
      expect(wrapperDiv).toHaveClass('edx-cookie-banner-wrapper');
      expect(wrapperDiv).toHaveAttribute('aria-label', expectedWrapperAriaLabel);
      expect(screen.getByText('Test cookie message content')).toBeInTheDocument();
    });
  });

  it('toggles banner closed when dismiss button is clicked', async () => {
    isOpen = true;

    render(<CookiePolicyBanner {...props} />);

    await waitFor(() => {
      expect(screen.getByRole('complementary')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button');
    userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByRole('complementary')).toBeNull();
      expect(createHasViewedCookieBanner).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
