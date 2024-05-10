import {
  getCookieCreationData,
  getIETFTagFromLanguageCode,
} from './utilities';
import {
  ENGLISH_IETF_TAG,
  SPANISH_IETF_TAG,
  DEFAULT_IETF_TAG,
  LOCALHOST,
} from './constants';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(() => ({
    LMS_BASE_URL: 'http://localhost:18000',
    COOKIE_POLICY_COOKIE_DOMAIN: 'http://localhost:18000',
    SESSION_COOKIE_DOMAIN: 'http://localhost:18000',
    LANGUAGE_PREFERENCE_COOKIE_NAME: 'en'
  })),
}));

describe('utilities', () => {
  describe('#getCookieCreationData', () => {
    it('localhost cookie creation data', () => {
      jsdom.reconfigure({ url: `http://${LOCALHOST}:8080/` });
      const expected = {
        cookieName: 'cookieconsent_status',
        domain: 'localhost',
        path: '/',
        maxAge: 2147483647,
      };
      expect(getCookieCreationData()).toEqual(expected);
    });

    it('localhost cookie creation data with overridden cookie name', () => {
      jsdom.reconfigure({ url: `http://${LOCALHOST}:8080/` });
      const expected = {
        cookieName: 'edx-updated-cookie-policy-viewed',
        domain: 'localhost',
        path: '/',
        maxAge: 2147483647,
      };
      expect(getCookieCreationData('edx-updated-cookie-policy-viewed')).toEqual(expected);
    });
  });

  describe('#getIETFTagFromLanguageCode', () => {
    it('returns the Spanish ieftTag when passed "es"', () => {
      expect(getIETFTagFromLanguageCode('es')).toEqual(SPANISH_IETF_TAG);
    });

    it('returns the English ieftTag when passed "en"', () => {
      expect(getIETFTagFromLanguageCode('en')).toEqual(ENGLISH_IETF_TAG);
    });

    it('returns the Default ieftTag when passed an unsupported languageCode', () => {
      expect(getIETFTagFromLanguageCode('de')).toEqual(DEFAULT_IETF_TAG);
    });
  });
});
