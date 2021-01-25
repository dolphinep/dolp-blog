import gql from 'graphql-tag'
import React, { useContext, useState, useRef } from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { Button, Header, Card, Comment, Grid, Image, Icon, Label, Form, Divider } from 'semantic-ui-react'
import moment from 'moment'
import { AuthContext } from '../context/auth'
import LikeButton from '../components/LikeButton'
import DeleteButton from '../components/DeleteButton'
import QuillEditor from '../components/editor/QuillEditor'
import parse from 'html-react-parser';


function SinglePost(props) {
    const postID = props.match.params.postID
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [story, setStory] = useState("")
    const [comment, setComment] = useState("")
    const [editing, setEditing] = useState(false)
    const { user } = useContext(AuthContext)


    const [files, setFiles] = useState([])

    const onEditorChange = (value) => {
        setStory(value)
    }

    const onFilesChange = (files) => {
        setFiles(files)
    }

    const commentInputRef = useRef(null)
    const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
        update() {
            setComment('');
            commentInputRef.current.blur();
        },
        variables: {
            postID,
            body: comment
        }
    });

    const [submitEdit] = useMutation(UPDATE_POST_MUTATION, {
        update() {
            setEditing(false)
        },
        variables: {
            postID,
            title,
            body,
            story
        }
    })

    const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postID
        },
        onCompleted() {
            setTitle(getPost.title)
            setBody(getPost.body)
            setStory(getPost.story)
        }
    })

    let postMarkup;
    if (!getPost) {
        postMarkup = <p>Loading post...</p>
    } else {
        const {
            id,
            title,
            body,
            tags,
            story,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount
        } = getPost;

        postMarkup = (
            <Grid stackable>
                <Grid.Column width={3} only="computer">
                    <Image src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                        size="small"
                        float="right" />
                </Grid.Column>
                <Grid.Column width={9}>
                    <Card fluid>
                        <Card.Content>
                            <Card.Header>{title}</Card.Header>
                            <Card.Meta>
                                {tags.map(tag => <Button basic content={tag} size="mini" compact color="blue" />)}
                            </Card.Meta>
                            <Card.Meta>{username}</Card.Meta>
                            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                            <Card.Description>{body}</Card.Description>
                        </Card.Content>
                    </Card>
                    <Card.Content extra>
                        <LikeButton user={user} post={{ id, likeCount, likes }} />
                        <Button
                            as="div"
                            labelPosition="right"
                            onClick={() => console.log("Comment on post")}>
                            <Button basic color="blue">
                                <Icon name="comments" />
                            </Button>
                            <Label basic color="blue" pointing="left">
                                {commentCount}
                            </Label>
                        </Button>
                        {user && user.username === username && (editing ?
                            <Button.Group floated="right" >
                                <Button onClick={() => setEditing(!editing)}>Cancle</Button>
                                <Button.Or />
                                <Button color="teal" onClick={submitEdit}>Save</Button>
                            </Button.Group>
                            :
                            story ?
                                <Button floated="right" color="teal" onClick={() => setEditing(!editing)}>Edit Story</Button>
                                :
                                <Button floated="right" color="teal" onClick={() => setEditing(!editing)}>Add Story...</Button>)}
                    </Card.Content>
                    <Divider hidden />
                    {user && editing ?
                        <QuillEditor
                            placeholder={"Start Posting Something"}
                            old={story}
                            onEditorChange={onEditorChange}
                            onFilesChange={onFilesChange}
                        />
                        :
                        (story && parse(story))

                    }
                    <Header as='h3' dividing>Comment</Header>
                    {comments.map(comment => (
                        <Comment.Group fluid key={comment.id}>
                            <Comment>
                                <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
                                <Comment.Content>
                                    {user && user.username === comment.username && (
                                        <DeleteButton postID={id} commentID={comment.id} />
                                    )}
                                    <Comment.Author>{comment.username}</Comment.Author>
                                    <Comment.Metadata>{moment(comment.createdAt).fromNow()}</Comment.Metadata>
                                    <Comment.Text>{comment.body}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        </Comment.Group>
                    ))}
                    {user && (
                        <Card fluid>
                            <Card.Content>
                                <p>Post a comment</p>
                                <Form>
                                    <div className="ui action input fluid">
                                        <input
                                            type="text"
                                            placeholder="Comment.."
                                            name="comment"
                                            value={comment}
                                            onChange={(event) => setComment(event.target.value)}
                                            ref={commentInputRef}
                                        />
                                        <button
                                            type="submit"
                                            className="ui button teal"
                                            disabled={comment.trim() === ''}
                                            onClick={submitComment}>
                                            Submit
                                            </button>
                                    </div>
                                </Form>
                            </Card.Content>
                        </Card>
                    )}
                </Grid.Column>
            </Grid>
        )
    }
    return postMarkup
}

const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postID: ID!, $body: String!) {
    createComment(postID: $postID, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
    query($postID: ID!){
        getPost(postID: $postID){
            id
            title
            body
            tags
            story
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

const UPDATE_POST_MUTATION = gql`
    mutation($postID: ID!,$title: String!, $body: String!, $story:String!) {
        updatePost(postID: $postID, title: $title, body: $body, story: $story){
            id
            title
            body
            story
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default SinglePost;
