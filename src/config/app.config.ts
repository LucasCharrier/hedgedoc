/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import { Loglevel } from './loglevel.enum';
import { buildErrorMessage, toArrayConfig } from './utils';

export interface AppConfig {
  domain: string;
  port: number;
  loglevel: Loglevel;
  forbiddenNoteIds: string[];
}

const schema = Joi.object({
  domain: Joi.string().label('HD_DOMAIN'),
  port: Joi.number().default(3000).optional().label('PORT'),
  loglevel: Joi.string()
    .valid(...Object.values(Loglevel))
    .default(Loglevel.WARN)
    .optional()
    .label('HD_LOGLEVEL'),
  forbiddenNoteIds: Joi.string()
    .optional()
    .default([])
    .label('HD_FORBIDDEN_NOTE_IDS'),
});

export default registerAs('appConfig', async () => {
  const appConfig = schema.validate(
    {
      domain: process.env.HD_DOMAIN,
      port: parseInt(process.env.PORT) || undefined,
      loglevel: process.env.HD_LOGLEVEL,
      forbiddenNoteIds: toArrayConfig(process.env.HD_FORBIDDEN_NOTE_IDS, ','),
    },
    {
      abortEarly: false,
      presence: 'required',
    },
  );
  if (appConfig.error) {
    const errorMessages = await appConfig.error.details.map(
      (detail) => detail.message,
    );
    throw new Error(buildErrorMessage(errorMessages));
  }
  return appConfig.value;
});
