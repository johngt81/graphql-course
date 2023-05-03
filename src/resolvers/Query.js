const Query = {
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
};

export { Query as default };
