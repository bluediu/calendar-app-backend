import 'dotenv/config';

import { get } from 'env-var';

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  MONGO_CNN: get('MONGO_CNN').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  SECRETORPRIVATEKEY: get('SECRETORPRIVATEKEY').required().asString(),
};
