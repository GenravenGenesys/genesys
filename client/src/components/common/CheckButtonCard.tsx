import {Card, CardContent, CardHeader, Divider, IconButton, Typography} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import GridItem from "./grid/GridItem";

interface Props {
    title: string
    value: boolean
    onChange: (value:boolean) => void
}

export default function CheckButtonCard(props: Props): JSX.Element {
    const {title,value,onChange} = props

    const handleClick = () => {
        onChange(value)
    }

    const checkIsTrue = (
        <IconButton title='True' size='small' onClick={(): void => handleClick()}>
            <CheckIcon color='primary' fontSize='small' />
        </IconButton>
    )

    const checkIsFalse = (
        <IconButton title='False' size='small' onClick={(): void => handleClick()}>
            <CancelIcon color='primary' fontSize='small' />
        </IconButton>
    )

    return (
        <GridItem>
            <Card>
                <CardHeader title={title} style={{textAlign: 'center'}} />
                <Divider />
                <CardContent>
                    <Typography style={{ textAlign: 'center' }}>{value ? checkIsTrue : checkIsFalse}</Typography>
                </CardContent>
            </Card>
        </GridItem>
    )
}