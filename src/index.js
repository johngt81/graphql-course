import { GraphQLError } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";
import Comment from "./resolvers/Comment";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/Post";
import Query from "./resolvers/Query";
import User from "./resolvers/User";

const users = [
  {
    id: "1",
    name: "Bryan",
    email: "bryan@sample.com",
    age: 32,
  },
  {
    id: "2",
    name: "Sara",
    email: "sara@gmail.com",
  },
  {
    id: "3",
    name: "Mike",
    email: "mike@aol.com",
  },
];

const posts = [
  {
    id: "10",
    title: "Graphql 101",
    body: "Book about graphql",
    published: true,
    author: "1",
  },
  {
    id: "11",
    title: "Graphql V2",
    body: "Book about graphql",
    published: true,
    author: "1",
  },
  {
    id: "12",
    title: "Graphql 201",
    body: "ChatGPT",
    published: true,
    author: "2",
  },
];

const comments = [
  {
    id: "102",
    text: "Great book!",
    author: "2",
    post: "10",
  },
  {
    id: "103",
    text: "Very hard to understand",
    author: "1",
    post: "10",
  },
  {
    id: "104",
    text: "I was able to complete all exercises",
    author: "2",
    post: "11",
  },
  {
    id: "105",
    text: `Can't wait for second version `,
    author: "1",
    post: "11",
  },
];

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

const db = { users, posts, comments };
const yoga = createYoga({ schema, context: { db } });

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("The server is up");
});
