import { Button, Confirm } from "semantic-ui-react";
import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { FETCH_POST_QUERY } from "../utils/graphql";

const DeleteButton = (props) => {
  const { postId, commentId, callback } = props;
  console.log('commentId: ', commentId);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [confirmOpen, setConfirm] = useState(false);
  const [deletPostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirm(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POST_QUERY,
        });
        proxy.writeQuery({
          query: FETCH_POST_QUERY,
          data: { getPosts: data.getPosts.filter((p) => p.id !== postId) },
        });
      }
      if (callback) {
        callback();
      }
    },
    variables: {
      postId,
      commentId
    },
  });
  return (
    <>
      <Button icon="trash" onClick={() => setConfirm(true)}></Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirm(false)}
        onConfirm={deletPostOrMutation}
      />
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`;
const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
