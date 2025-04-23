import {Card, Divider, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import GridContainer from "./grid/GridContainer";
import GridItem from "./grid/GridItem";

interface ViewProps {
    title: string
    value: number
    check: boolean
    checkTitle: string
}

export function ViewNumberCheckBoxCard(props: ViewProps) {
    const {title, value, check, checkTitle} = props

    return (
        <GridItem>
            <Card>
                <GridContainer>
                    <GridItem>
                        <Typography style={{textAlign: 'center'}}>{title}</Typography>
                        <Divider/>
                        <Typography style={{textAlign: 'center'}}>{value || 0}</Typography>
                    </GridItem>
                    <GridItem>
                        <Typography style={{textAlign: 'center'}}>{checkTitle}</Typography>
                        <Divider/>
                        <Typography style={{textAlign: 'center'}}>
                            {check ? <CheckIcon color='primary' fontSize='small'/> :
                                <CancelIcon color='primary' fontSize='small'/>}
                        </Typography>
                    </GridItem>
                </GridContainer>
            </Card>
        </GridItem>
    )
}