import { parse } from "pg-connection-string";
import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "postgres");

  if (client === "postgres") {
    const dbUrl = env("DATABASE_URL");
    if (!dbUrl) {
      throw new Error("Missing DATABASE_URL environment variable");
    }

    const config = parse(dbUrl);

    return {
      connection: {
        client: "postgres",
        connection: {
          host: config.host,
          port: Number(config.port),
          database: config.database,
          user: config.user,
          password: config.password,
          ssl: {
            rejectUnauthorized: false,
          },
        },
      },
    };
  }

  return {
    connection: {
      client: "sqlite",
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
};
