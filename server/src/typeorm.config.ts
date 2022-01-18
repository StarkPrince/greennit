import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";
import dotenv from "dotenv";

dotenv.config();

export default {
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  entities: [Post, User],
  dbName: "greennit",
  type: "postgresql",
  debug: !__prod__,
  password: process.env.PG_PASS,
} as Parameters<typeof MikroORM.init>[0];
