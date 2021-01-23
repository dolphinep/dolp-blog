import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import MyPopup from '../utils/MyPopup';

function DeleteButton({ postID, commentID, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentID ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    refetchQueries: [{
      query: FETCH_POSTS_QUERY
    }],
    onError(err) {
      console.log(err)
    },
    variables: {
      postID,
      commentID
    }
  });
  return (
    <>
      <MyPopup content={commentID ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          floated="right"
          icon
          size="small"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} size="small"/>
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postID: ID!) {
    deletePost(postID: $postID)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postID: ID!, $commentID: ID!) {
    deleteComment(postID: $postID, commentID: $commentID) {
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