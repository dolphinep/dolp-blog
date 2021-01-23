import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import MyPopup from '../utils/MyPopup';

function SaveChangeButton({ postID, title, body, story, callback }) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const [updatePostOrMutation] = useMutation(UPDATE_POST_MUTATION, {
        refetchQueries: [{
            query: FETCH_POSTS_QUERY
        }],
        onError(err) {
            console.log(err)
        },
        variables: {
            postID,
            title,
            body,
            story
        },
        onCompleted(){
            
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
                    <Icon name="trash" style={{ margin: 0 }} size="small" />
                </Button>
            </MyPopup>
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={updatePostOrMutation}
            />
        </>
    );
}

const UPDATE_POST_MUTATION = gql`
  mutation updatePost($postID: ID!, $title: String!, $body:String!, $Story:String!) {
    updatePost(postID: $postID, title: $title, body:$body, story: $story){
        id
      title
      body
      story
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default SaveChangeButton;