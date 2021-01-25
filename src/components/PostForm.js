import React, { useState } from 'react';
import { Button, Divider, Dropdown, Form, Header } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { useForm } from '../utils/hooks';
import { FETCH_POSTS_QUERY } from '../utils/graphql';

function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        title: '',
        body: '',
        tags: []
    });

    const [options, setOptions] = useState(
        [
            { key: 'DB', text: 'DB', value: 'DB' },
            { key: 'DEV', text: 'DEV', value: 'DEV' },
            { key: 'BLOCKCHAIN', text: 'BLOCKCHAIN', value: 'BLOCKCHAIN' },
            { key: 'WEB', text: 'WEB', value: 'WEB' },
            { key: 'MOBILE', text: 'MOBILE', value: 'MOBILE' },
        ]
    )
    const handleAddition = (e, { value }) => {
        setOptions([...options, { text: value, value }])
    }

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
            values.tag = []
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
                        name="title"
                        onChange={(e, { value }) => onChange(e, "title", value)}
                        value={values.title}
                        error={error ? true : false}
                    />
                    <Form.TextArea
                        placeholder="Detail"
                        name="body"
                        onChange={(e, { value }) => onChange(e, "body", value)}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Dropdown
                        options={options}
                        placeholder='Tags'
                        name='tags'
                        search
                        selection
                        fluid
                        multiple
                        allowAdditions
                        value={values.tags}
                        onAddItem={handleAddition}
                        onChange={(e, { value }) => onChange(e, "tags", value)}
                    />
                    <Divider hidden />
                    <Button compact type="submit" color="blue">
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
  mutation createPost($title: String!, $body: String!, $tags:[String]!) {
    createPost(title: $title, body:$body, tags:$tags) {
      id
      title
      body
      story
      tags
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