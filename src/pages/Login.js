import React, { useContext, useState } from 'react';
import { Button, Message, Segment, Image, Header, Form, Grid } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

// import { AuthContext } from '../context/auth';
import { useForm } from '../utils/hooks';

import { AuthContext } from '../context/auth'

function Login(props) {
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState({});

    const { onChange, onSubmit, values } = useForm(loginUserCallback, {
        username: '',
        password: ''
    });

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, { data: { login: userData } }) {
            context.login(userData);
            props.history.push('/');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    });

    function loginUserCallback() {
        loginUser();
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 450 }}>
                <Form size='large' onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
                    <Header as='h2' color='blue' textAlign='center'>
                        <Image src='https://www.flaticon.com/svg/static/icons/svg/3009/3009728.svg' /> Log-in to your account
                    </Header>
                    <Segment stacked>
                        <Form.Input
                            placeholder="Username.."
                            name="username"
                            type="text"
                            icon='user'
                            iconPosition='left'
                            value={values.username}
                            error={errors.username ? true : false}
                            onChange={(e, { value }) => onChange(e, 'username', value)}
                        />
                        <Form.Input
                            placeholder="Password.."
                            name="password"
                            type="password"
                            icon='lock'
                            iconPosition='left'
                            value={values.password}
                            error={errors.password ? true : false}
                            onChange={(e, { value }) => onChange(e, 'password', value)}
                        />
                        <Button type="submit" fluid color="blue">Login</Button>
                    </Segment>
                </Form>
                {Object.keys(errors).length > 0 && (
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map((value) => (
                                <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <Message>
                    New to us? <a href='/register'>  Register</a>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;