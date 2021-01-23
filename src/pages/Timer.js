import React, { useEffect, useState } from 'react'
import { Container, Divider, Grid, Segment } from 'semantic-ui-react'
import '../sass/timer.scss'
let t = new Date()

const Timer = () => {
    const [time, setTime] = useState(t)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval);
    }, [])
    return (
        <Container>
            <Grid columns={3} textAlign="center" divided>
                <Grid.Row className="time">
                    <Grid.Column largeScreen="3">
                        {time.getHours() % 12}
                    </Grid.Column>
                    <Grid.Column largeScreen="3">
                        {time.getMinutes()}
                    </Grid.Column>
                    <Grid.Column largeScreen="3">
                        {time.getSeconds()}
                    </Grid.Column>
                    {time.getHours() / 12 < 1 ? 'AM' : 'PM'}
                </Grid.Row>
            </Grid>
        </Container>
    )
}

export default Timer
