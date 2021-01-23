import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../utils/MyPopup';

function LikeButton({ user, post: { id, likeCount, likes } }) {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (user && likes.find((like) => like.username === user.username)) {
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postID: id },
        onError(error){
            console.log("[Like Error]: ", error)
        }
    });

    const likeButton = user ? (
        liked ? (
            <Button size="small" color="red">
                <Icon name="heart" />
            </Button>
        ) : (
                <Button size="small" color="red" basic>
                    <Icon name="heart" />
                </Button>
            )
    ) : (
            <Button size="small"  as={Link} to="/login" color="red" basic>
                <Icon name="heart" />
            </Button>
        );

    return (
        <Button as="div" labelPosition="right" onClick={likePost}>
            <MyPopup content={liked ? 'Unlike' : 'Like'}>{likeButton}</MyPopup>
            <Label basic color="red" pointing="left">
                {likeCount}
            </Label>
        </Button>
    );
}

// automatic update like in post (in client)
const LIKE_POST_MUTATION = gql`
  mutation likePost($postID: ID!) {
    likePost(postID: $postID) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;