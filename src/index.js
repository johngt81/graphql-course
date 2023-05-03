import { GraphQLError } from "graphql";
import { createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs";

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

// Resolver
const resolvers = {
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = ctx.db.users.some((user) => {
        return user.email === args.data.email;
      });

      if (emailTaken) {
        throw new GraphQLError("Email taken");
      }

      const user = {
        id: uuidv4(),
        name: args.data.name,
        email: args.data.email,
        age: args.data.age,
      };

      ctx.db.users.push(user);

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = ctx.db.users.some(
        (user) => user.id === args.data.author
      );
      if (!userExists) {
        throw new GraphQLError("User not found");
      }

      const post = {
        id: uuidv4(),
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: args.data.author,
      };

      ctx.db.posts.push(post);
      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = ctx.db.users.some(
        (user) => user.id === args.data.author
      );
      if (!userExists) {
        throw new GraphQLError("User not found");
      }

      const postExists = ctx.db.posts.some(
        (post) => post.id === args.data.post
      );
      if (!postExists) {
        throw new GraphQLError("Post not found");
      }

      const comment = {
        id: uuidv4(),
        text: args.data.text,
        author: args.data.author,
        post: args.data.post,
      };
      ctx.db.comments.push(comment);

      return comment;
    },
  },
  Post: {
    author(parent, args, ctx, info) {
      return ctx.db.users.find((user) => {
        return user.id === parent.author;
      });
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts(parent, args, ctx, info) {
      return ctx.db.posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author(parent, args, ctx, info) {
      return ctx.db.users.find((user) => {
        return user.id === parent.author;
      });
    },
    post(parent, args, ctx, info) {
      return ctx.db.posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers: resolvers,
});

const db = { users, posts, comments };
const yoga = createYoga({ schema, context: { db } });

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("The server is up");
});
