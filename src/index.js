import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import path from "path";
import fs from "fs";
import Comment from "./resolvers/Comment";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/Post";
import Query from "./resolvers/Query";
import User from "./resolvers/User";
import db from "./db";

const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers: {
    Comment,
    Mutation,
    Post,
    Query,
    User,
  },
});

const yoga = createYoga({ schema, context: { db } });

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("The server is up");
});
