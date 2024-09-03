// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Function to detect iOS devices like IPhones, IPads, and IPods
 */
export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
