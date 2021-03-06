/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

export enum GitlabScope {
  READ_USER = 'read_user',
  API = 'api',
}

// ToDo: Evaluate if V3 is really necessary anymore (it's deprecated since 2017)
export enum GitlabVersion {
  V3 = 'v3',
  V4 = 'v4',
}
