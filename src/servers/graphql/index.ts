import { ApolloServer } from "apollo-server";
import { verify } from "jsonwebtoken";
import resolvers from "./resolvers";
import typeDefs from "./typedefs";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  context: ({ req }) => {
    if (req.headers.authorization) {
      return { id: verify(req.headers.authorization, "JWTSECRET!") };
    }
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  APOLLO GRAPHQL SERVER RUNNING AT ${url}`);
});
