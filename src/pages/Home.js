import React, { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Header, Segment, Transition, Loader } from 'semantic-ui-react'

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import PostCard from '../components/PostCard'
import PostForm from '../components/PostForm'
import { AuthContext } from '../context/auth'

import '../sass/home.scss'
import AuthorCard from '../components/AuthorCard';

function Home() {
    const { user } = useContext(AuthContext)
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);
    return (
        <Grid style={{ marginTop: '3em' }} relaxed stackable reversed='mobile' >
            <Grid.Column width={12}>
                {user && (
                    <Segment>
                        <PostForm />
                    </Segment>
                )}
                <Grid.Row className="page-title">
                    <Header as='h2'>Recent Posts</Header>
                </Grid.Row>
                <Grid columns={3}>
                    <Grid.Row stretched stackable columns={2}>
                        {loading ? (
                            <Loader>Loading</Loader>
                        ) : (
                                <Transition.Group>
                                    {data.getPosts &&
                                        data.getPosts.map((post) => (
                                            <Grid.Column computer={8} mobile={16} key={post.id} style={{ marginBottom: 20 }}>
                                                <PostCard post={post} />
                                            </Grid.Column>
                                        ))}
                                </Transition.Group>
                            )}
                    </Grid.Row>
                </Grid>
            </Grid.Column>
            <Grid.Column width={4}>
                <AuthorCard />
            </Grid.Column>
        </Grid>
    );
}

export default Home