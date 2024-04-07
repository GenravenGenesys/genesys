import {Experience} from "../../models/actor/player/Player";
import {Card, Divider, Grid, Typography} from "@mui/material";

interface Props {
    experience: Experience;
}

export default function ExperienceCard(props: Props): JSX.Element {
    const { experience } = props;

    return (
        <Grid item xs>
            <Card>
                <Grid container spacing={0}>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }}>{'Total'}</Typography>
                        <Divider />
                        <Typography style={{ textAlign: 'center' }}>
                            {experience.total}
                        </Typography>
                    </Grid>
                    <Grid item xs>
                        <Typography style={{ textAlign: 'center' }}>{'Available'}</Typography>
                        <Divider />
                        <Typography style={{ textAlign: 'center' }}>
                            {experience.available}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>

    )
}