// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

export const localStorageAvailable = typeof Storage !== 'undefined';

// localStorage.js

const LocalStorageKeys = {
  USER_TOKEN: 'userToken',
  USER_SETTINGS: 'userSettings',
  THEME: 'theme',
  LANGUAGE: 'language'
};

export default LocalStorageKeys;

/**
 * Get display name from local storage.
 */
export const getDisplayNameFromLocalStorage = () =>
  window.localStorage.getItem(LocalStorageKeys.DisplayName);

/**
 * Save display name into local storage.
 */
export const saveDisplayNameToLocalStorage = (displayName) =>
  window.localStorage.setItem(LocalStorageKeys.DisplayName, displayName);

/**
 * Get theme from local storage.
 */
export const getThemeFromLocalStorage = (scopeId) =>
  window.localStorage.getItem(LocalStorageKeys.Theme + '_' + scopeId);

/**
 * Save theme into local storage.
 */
export const saveThemeToLocalStorage = (theme, scopeId) =>
  window.localStorage.setItem(LocalStorageKeys.Theme + '_' + scopeId, theme);
