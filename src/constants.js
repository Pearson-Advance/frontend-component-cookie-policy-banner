import { getConfig } from "@edx/frontend-platform";
// Read the env variables
const LMS_BASE_URL = getConfig().LMS_BASE_URL || '';
const COOKIE_POLICY_VIEWED_NAME = getConfig().COOKIE_POLICY_VIEWED_NAME || 'openedx-cookie-policy-viewed';
const SITE_NAME = getConfig().SITE_NAME || 'Your Platform Name Here';
const COOKIE_POLICY_PAGE_URL = getConfig().COOKIE_POLICY_PAGE_URL || 'https://www.cookiesandyou.com/'

// https://en.wikipedia.org/wiki/IETF_language_tag
const ENGLISH_IETF_TAG = 'en';
const SPANISH_IETF_TAG = 'es-419';
const DEFAULT_IETF_TAG = ENGLISH_IETF_TAG;
const ENGLISH_LANGUAGE_CODE = 'en';
const SPANISH_LANGUAGE_CODE = 'es';
const LOCALHOST = 'localhost';

const IETF_TAGS = Object.freeze([ENGLISH_IETF_TAG, SPANISH_IETF_TAG]);
const LANGUAGE_CODES = Object.freeze([ENGLISH_LANGUAGE_CODE, SPANISH_LANGUAGE_CODE]);

const IETF_TAGS_TO_CONTAINER_ROLE_LABEL = Object.freeze({
  [ENGLISH_IETF_TAG]: `Notice about use of cookies on ${SITE_NAME}.`,
  [SPANISH_IETF_TAG]: `Aviso sobre el uso de cookies en ${SITE_NAME}.`,
});
const IETF_TAGS_TO_CLOSE_BUTTON_LABEL = Object.freeze({
  [ENGLISH_IETF_TAG]: `Close the notice about use of cookies on ${SITE_NAME}.`,
  [SPANISH_IETF_TAG]: `Cerrar aviso sobre el uso de cookies en ${SITE_NAME}.`,
});
const IETF_TAGS_TO_LANGUAGE_CODE = Object.freeze({
  [ENGLISH_IETF_TAG]: ENGLISH_LANGUAGE_CODE,
  [SPANISH_IETF_TAG]: SPANISH_LANGUAGE_CODE,
});
const LANGUAGE_CODE_TO_IETF_TAGS = Object.freeze({
  [ENGLISH_LANGUAGE_CODE]: ENGLISH_IETF_TAG,
  [SPANISH_LANGUAGE_CODE]: SPANISH_IETF_TAG,
});

const getPolicyHTML = (tag, overrideText = {}) => {
  if (overrideText[tag]) {
    return overrideText[tag];
  }

  const linkClose = '</a>';

  if (tag === SPANISH_IETF_TAG) {
    const linkOpen = `<a href="${COOKIE_POLICY_PAGE_URL} class="policy-link" target = "_blank"> rel="noopener noreferrer"`;
    return `Esta página web usa cookies para que tenga la mejor experiencia en nuestro sitio web. Si continua usando este sitio, entender que usted acepta el use de cookies. ${linkOpen}Aprender más${linkClose}.`;
  }

  const linkOpen = `<a href="${COOKIE_POLICY_PAGE_URL} class="policy-link" target = "_blank"> rel="noopener noreferrer"`;
  return `This website uses cookies to ensure you get the best experience on our website. If you continue browsing this site, we understand that you accept the use of cookies. ${linkOpen}Learn more${linkClose}.`;
};

export {
  ENGLISH_IETF_TAG,
  SPANISH_IETF_TAG,
  DEFAULT_IETF_TAG,
  ENGLISH_LANGUAGE_CODE,
  LANGUAGE_CODES,
  IETF_TAGS,
  IETF_TAGS_TO_CONTAINER_ROLE_LABEL,
  IETF_TAGS_TO_CLOSE_BUTTON_LABEL,
  IETF_TAGS_TO_LANGUAGE_CODE,
  getPolicyHTML,
  LANGUAGE_CODE_TO_IETF_TAGS,
  LOCALHOST,
  COOKIE_POLICY_VIEWED_NAME,
};
