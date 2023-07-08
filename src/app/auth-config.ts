import {
  BrowserCacheLocation,
  Configuration,
  LogLevel,
} from '@azure/msal-browser';

export const b2cPolicies = {
  names: {
    signUpSignIn: 'B2C_1_susi1',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://budgetbuddyapp.b2clogin.com/budgetbuddyapp.onmicrosoft.com/B2C_1_susi1',
    },
  },
  authorityDomain: 'budgetbuddyapp.b2clogin.com',
};

export const msalConfig: Configuration = {
  auth: {
    clientId: '69416eb0-067a-4575-8c6d-33b36006f1f0',
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/',
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (logLevel, message, containsPii) => {
        console.log(message);
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
    allowNativeBroker: false,
  },
};

export const protectedResources = {
  bbApi: {
    endpoint: 'http://localhost:7138/',
    scopes: ['https://budgetbuddyapp.onmicrosoft.com/api/bb.read-write'],
  },
};
