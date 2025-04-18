import {Card, Divider, Grid, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";

interface ViewProps {
    title: string
    value: number
    check: boolean
    checkTitle: string
}

export function ViewNumberCheckBoxCard(props: ViewProps) {
    const {title, value, check, checkTitle} = props

    return (
        <Grid xs>
            <Card>
                <Grid container spacing={0}>
                    <Grid xs>
                        <Typography style={{textAlign: 'center'}}>{title}</Typography>
                        <Divider/>
                        <Typography style={{textAlign: 'center'}}>{value || 0}</Typography>
                    </Grid>
                    <Grid xs>
                        <Typography style={{textAlign: 'center'}}>{checkTitle}</Typography>
                        <Divider/>
                        <Typography style={{textAlign: 'center'}}>
                            {check ? <CheckIcon color='primary' fontSize='small'/> :
                                <CancelIcon color='primary' fontSize='small'/>}
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}