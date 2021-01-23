import React, { useState } from 'react';
import { Button, Form, Header } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        title: '',
        body: ''
    });

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        refetchQueries: [{
            query: FETCH_POSTS_QUERY
        }],
        onError(err) {
            console.log(err)
        },
        onCompleted() {
            values.title = ""
            values.body = ""
        },
        variables: values,
    });

    function createPostCallback() {
        createPost();
    }

    return (
        <>
            <Form onSubmit={onSubmit}>
                <Header as='h2'>Create post</Header>
                <Form.Field>
                    <Form.Input
                        placeholder="Title"
                        name="Title"
                        onChange={onChange}
                        value={values.title}
                        error={error ? true : false}
                    />
                    <Form.TextArea
                        placeholder="Sub-Title"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button  compact type="submit" color="blue">
                        Submit
                    </Button>
                </Form.Field>
            </Form>
            {error && (
                <div className="ui error message" style={{ marginBottom: 20 }}>
                    <ul className="list">
                        <li>{error.graphQLErrors[0].message}</li>
                    </ul>
                </div>
            )}
        </>
    );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(title: $title, body:$body) {
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

export default PostForm;