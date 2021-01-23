import { Card, Image, Icon, Grid, Container, Header, Divider } from 'semantic-ui-react'
import '../sass/home.scss'

const AuthorCard = () => {
    const detail = {
        header: 'Dolp Blog',
        description: 'ยินดีต้อนรับครับผม นี่เป็นบล็อคส่วนตัวของผมเอง ถ้ามีตรงไหนแนะนำสามารถคอมเม้น หรือทักมาคุยได้ครับ',
        update: '22/JAN/2021'
    }

    return (
        // <Card centered color="blue">
        //     <Image className="author-image" src='https://pingbox.s3-ap-southeast-1.amazonaws.com/pictures/dolphin.png' size='medium' circular />
        //     <Card.Content>
        //         <Card.Header>{detail.header}</Card.Header>
        //         <Card.Description>{detail.description}</Card.Description>
        //     </Card.Content>
        // </Card>
        <Container textAlign="center">
            <Image className="author-image" src='https://pingbox.s3-ap-southeast-1.amazonaws.com/pictures/dolphin.png' size='medium' centered />
            <Header>
                {detail.header}
            </Header>
            <p>{detail.description}</p>
            <Divider />
            <p>update:  {detail.update}</p>
        </Container>
    )
}

export default AuthorCard