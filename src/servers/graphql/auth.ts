import { getPost } from "../../modules";
import { GQLContextAuth, GQLUserContext } from "../../types";
import { handleError } from "../../utils/errors";

const ERROR_MESSAGE = "You do not have permission to perform this function";

const authorizeToken = (context?: GQLUserContext) => {
  handleError(!context, ERROR_MESSAGE);
};

const authorizeUser = ({ context, id }: GQLContextAuth) => {
  authorizeToken(context);
  handleError(context!.id !== id, ERROR_MESSAGE);
};

const authorizePost = async ({ id, context }: GQLContextAuth) => {
  const post = await getPost(id);
  authorizeUser({ context, id: post.userId });
  return post;
};

export { authorizeUser, authorizeToken, authorizePost };
