import React from 'react'
import { Container, Card, Divider, List, Icon, Rating } from 'semantic-ui-react'
import '../sass/contact.scss'

function Contact() {
    return (
        <Container>
            <Card.Group centered>
                <Card>
                    <Card.Content textAlign="center">
                        <Card.Header>AUTHOR</Card.Header>
                        <Divider />
                        <Card.Description>------  PING  ------</Card.Description>
                        <Divider />
                        <Card.Description>Chulalongkorn University</Card.Description>
                        <Divider />
                        <Card.Description>
                            <Icon name="mail" />ping.waragon@gmail.com</Card.Description>
                        <br />
                        <Card.Description>
                            <Icon name="phone" />+66-88-585-1415</Card.Description>
                        <br />
                        <Card.Description href="https://github.com/dolphinep">
                            <Icon name="github" />https://github.com/dolphinep</Card.Description>
                        <br />
                        <br />
                        <Card.Description href="https://medium.com/@ping.waragon">
                            <Icon name="medium" />https://medium.com/@ping.waragon</Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content textAlign="center">
                        <Card.Header>INTEREST</Card.Header>
                        <Divider />
                        <Card.Description>INTERESTED IN ALL TECHNOLOGY ON/OUT THE EARTH</Card.Description>
                        <Divider />
                        <Card.Description>
                            <List >
                                <List.Item>
                                    Full-Stack Developer</List.Item>
                                <Icon name="heart outline" />
                                <List.Item>
                                    BlockChain Developer</List.Item>
                                <Icon name="heart outline" />
                                <List.Item>
                                    Machine Learning</List.Item>
                                <Icon name="heart outline" />
                                <List.Item>
                                    Technology Consult</List.Item>
                            </List>
                        </Card.Description>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content textAlign="center">
                        <Card.Header>SKILL</Card.Header>
                        <Divider />
                        <Card.Description>Base on internship, classroom and self study (max 5)</Card.Description>
                        <Divider />
                        <Card.Description textAlign="left">
                            <List >
                                <List.Item>
                                    <Icon name="thumbs up outline" />
                                    <List.Content>Front-End
                                        <List.List>
                                            <List.Item>
                                                React(4)
                                                <Rating className="skill" maxRating={5} defaultRating={4} icon='star' />
                                            </List.Item>
                                            <List.Item>
                                                CSS/SCSS(2)
                                                <Rating className="skill" maxRating={5} defaultRating={2} icon='star' />
                                            </List.Item>
                                        </List.List>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon name="thumbs up outline" />
                                    <List.Content>Back-End
                                        <List.List>
                                            <List.Item>
                                                Golang(4)
                                                <Rating className="skill" maxRating={5} defaultRating={4} icon='star' />
                                            </List.Item>
                                            <List.Item>
                                                NodeJS(3)
                                                <Rating className="skill" maxRating={5} defaultRating={3} icon='star' />
                                            </List.Item>
                                        </List.List>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon name="thumbs up outline" />
                                    <List.Content>Database
                                        <List.List>
                                            <List.Item>
                                                MongoDB(4)
                                                <Rating className="skill" maxRating={5} defaultRating={4} icon='star' />
                                            </List.Item>
                                            <List.Item>
                                                Postgresql(4)
                                                <Rating className="skill" maxRating={5} defaultRating={4} icon='star' />
                                            </List.Item>
                                        </List.List>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <Icon name="thumbs up outline" />
                                    <List.Content>OTHER SKILL
                                        <List.List>
                                            <List.Item>
                                                <Icon name="star" />
                                                CLOUD - AWS/FIREBASE
                                          </List.Item>
                                            <List.Item>
                                                <Icon name="star" />
                                                GIT
                                           </List.Item>
                                            <List.Item>
                                                <Icon name="star outline" />
                                                PYTHON, JAVA, C++
                                           </List.Item>
                                            <List.Item>
                                                <Icon name="star" />
                                                GRAPHQL
                                           </List.Item>
                                        </List.List>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>
        </Container>
    )
}

export default Contact


