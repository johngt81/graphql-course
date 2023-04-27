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
    id: "4",
    name: "Mike",
    email: "mike@aol.com",
  },
];

// Type definitions (schema)
const typeDefs = `
    type Query {
        grades: [Int!]!
        greeting(name: String): String!
        users(query: String): [User!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }

    type Post {
        id: ID!
        title:  String!
        body: String!
        published: Boolean!
    }
`;

// Resolver
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users;
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    grades() {
      return [10, 20];
    },
    greeting(parent, args, context, info) {
      if (args.name) {
        return `Hello, ${args.name}`;
      } else {
        return "Hello";
      }
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
};

const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const yoga = createYoga({ schema });

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("The server is up");
});
