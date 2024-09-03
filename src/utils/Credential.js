// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureCommunicationTokenCredential, CommunicationTokenRefreshOptions } from '@azure/communication-common';
import { AbortSignalLike } from '@azure/abort-controller';
import IP from '../views/IP.json'
const postRefreshTokenParameters = {
  method: 'POST'
};

/**
 * Create credentials that auto-refresh asynchronously.
 */
export const createAutoRefreshingCredential = (userId, token) => {
  const options = {
    token: token,
    tokenRefresher: refreshTokenAsync(userId),
    refreshProactively: true
  };
  return new AzureCommunicationTokenCredential(options);
};

const refreshTokenAsync = (userIdentity) => {
  return async () => {
    const response = await  fetch(`${IP.localIP}refreshToken/${userIdentity}`, postRefreshTokenParameters);
    if (response.ok) {
      return (await response.json()).token;
    } else {
      throw new Error('could not refresh token');
    }
  };
};
