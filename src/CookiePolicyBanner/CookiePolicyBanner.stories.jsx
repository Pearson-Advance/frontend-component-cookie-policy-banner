import React from 'react';
import CookiePolicyBanner from './index';
import { SPANISH_IETF_TAG, ENGLISH_IETF_TAG } from '../constants';

import './_storybook-styles.scss';

const policyText = {
  [SPANISH_IETF_TAG]: 'Hemos actualizado nuestra <a href="https://edx.org/es/edx-privacy-policy" class="policy-link" target="_blank">Política de Privacidad</a> para mejor reflejar cómo coleccionamos, usamos y compartimos sus datos.',
  [ENGLISH_IETF_TAG]: 'We\'ve updated our <a href="https://edx.org/edx-privacy-policy" class="policy-link" target="_blank">Privacy Policy</a> to better reflect how we collect, use and share your data.',
};

const cookieName = 'cookieconsent_status_storybook';

const renderBanner = (args, suffix) => {
  const name = `${cookieName}_${suffix}`;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  return <CookiePolicyBanner {...args} isViewedCookieName={name} />;
};

export default {
  title: 'Cookie Policy Banner',
  component: CookiePolicyBanner,
};

export const BasicUsage = {
  render: (args) => renderBanner(args, 'basic'),
};

export const OverriddenPolicyText = {
  render: (args) => renderBanner(args, 'policy_text'),
  args: {
    policyText,
  },
};

export const LanguageCodeEsOverride = {
  render: (args) => renderBanner(args, 'es'),
  args: {
    languageCode: 'es',
  },
};

export const LanguageCodeEsOverriddenPolicyText = {
  render: (args) => renderBanner(args, 'es_policy'),
  args: {
    languageCode: 'es',
    policyText,
  },
};

export const LanguageCodeEnOverride = {
  render: (args) => renderBanner(args, 'en'),
  args: {
    languageCode: 'en',
  },
};

export const LanguageCodeEnOverriddenPolicyText = {
  render: (args) => renderBanner(args, 'en_policy'),
  args: {
    languageCode: 'en',
    policyText,
  },
};

export const LanguageCodeUnsupportedOverride = {
  render: (args) => renderBanner(args, 'unsupported'),
  args: {
    languageCode: 'notsupported',
  },
};

export const LanguageCodeUnsupportedOverriddenPolicyText = {
  render: (args) => renderBanner(args, 'unsupported_policy'),
  args: {
    languageCode: 'notsupported',
    policyText,
  },
};
