// import myCurrentLocation from './myModule'
import { GraphQLServer, createSchema, createYoga } from "graphql-yoga";
import { createServer } from "node:http";

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
// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title:  String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]
    }

    type Comment {
      id: ID!
      text: String!
      author: User!
      post: Post!
    }
`;

// Resolver
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return ctx.db.users;
      }

      return ctx.db.users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if (!args.query) {
        return ctx.db.posts;
      }
    },
    comments(parent, args, ctx, info) {
      return ctx.db.comments;
    },
    me() {
      return {
        id: "1234",
        name: "bryan",
        email: "bryan@email.com",
        age: 12,
      };
    },
    post() {
      return {
        id: "0123",
        title: "Graph",
        body: "",
        published: false,
      };
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
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const db = { users, posts, comments };
const yoga = createYoga({ schema, context: { db } });

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("The server is up");
});
