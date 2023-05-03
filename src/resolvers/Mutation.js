const Mutation = {
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

    const postExists = ctx.db.posts.some((post) => post.id === args.data.post);
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
};

export { Mutation as default };
