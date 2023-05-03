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

const db = {
  users,
  posts,
  comments,
};
export { db as default };
