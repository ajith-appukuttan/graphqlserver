const mocks = {
    User: () => ({
      id: () => '1',
      username: () => 'mockuser',
      role: () => 'admin'
    }),
    Query: () => ({
      currentUser: () => ({ id: '1', username: 'mockuser', role: 'admin' }),
      getUser: (_, { id }) => ({ id, username: 'mockuser', role: 'user' })
    }),
  };

  export default mocks;
