import path from "path";
import { parse } from "pg-connection-string";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres");

  const connections = {
    postgres: {
      connection: (() => {
        const { host, port, database, user, password } = parse(
          env("DATABASE_URL")
        );

        return {
          host,
          port: Number(port),
          database,
          user,
          password,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      })(),
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },

    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
