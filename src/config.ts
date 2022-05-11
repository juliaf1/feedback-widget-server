import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
  PORT: number | undefined;
  DATABASE_URL: string | undefined;
  ADMIN_EMAIL: string | undefined;
  MAILTRAP_PORT: number | undefined;
  MAILTRAP_HOST: string | undefined;
  MAILTRAP_USER: string | undefined;
  MAILTRAP_PASS: string | undefined;
}

interface Config {
  PORT: number;
  DATABASE_URL: string;
  ADMIN_EMAIL: string;
  MAILTRAP_PORT: number;
  MAILTRAP_HOST: string;
  MAILTRAP_USER: string;
  MAILTRAP_PASS: string;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
  return {
    PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
    DATABASE_URL: process.env.DATABASE_URL,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    MAILTRAP_PORT: process.env.MAILTRAP_PORT ? Number(process.env.MAILTRAP_PORT) : undefined,
    MAILTRAP_HOST: process.env.MAILTRAP_HOST,
    MAILTRAP_USER: process.env.MAILTRAP_USER,
    MAILTRAP_PASS: process.env.MAILTRAP_PASS,
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in config.env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
