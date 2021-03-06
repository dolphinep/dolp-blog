import React, { useContext } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton'
import MyPopup from '../utils/MyPopup';

function PostCard({
    post: { title, body, createdAt, id, username, likeCount, commentCount, likes, tags }
}) {
    const { user } = useContext(AuthContext);

    return (
        <Card color="blue" fluid>
            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                />
                <Card.Header as={Link} to={`/posts/${id}`}>
                    {title}
                </Card.Header>
                <Card.Meta>
                    {tags.map(tag => <Button basic content={tag} size="mini" compact color="blue" />)}
                </Card.Meta>
                <Card.Meta as={Link} to={`/posts/${id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Meta>{username}</Card.Meta>
                <Card.Description >{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <MyPopup content="Comment on post">
                    <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
                        <Button color="blue" basic>
                            <Icon name="comments" />
                        </Button>
                        <Label basic color="blue" pointing="left">
                            {commentCount}
                        </Label>
                    </Button>
                </MyPopup>
                {user && user.username === username && <DeleteButton postID={id} />}
                {user && user.username === username && <EditButton postID={id} />}
            </Card.Content>
        </Card>
    );
}

export default PostCard;