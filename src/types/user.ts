import { SignOptions } from 'jsonwebtoken';

export type TSignToken = (
  payload: Object,
  duration?: SignOptions['expiresIn']
) => Promise<string | null>;
