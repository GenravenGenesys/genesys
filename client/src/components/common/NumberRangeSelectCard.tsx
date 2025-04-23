import {Card, CardActions} from "@mui/material";
import InputNumberRangeSelectField from "./InputNumberRangeSelect";
import CenteredCardHeader from "./card/header/CenteredCardHeader";
import GridItem from "./grid/GridItem";

interface Props {
    defaultValue: number
    title: string
    onChange: (value: number) => void
    min: number
    max: number
}

export default function NumberRangeSelectCard(props: Props) {
    const {defaultValue, title, onChange, min, max} = props

    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardActions>
                    <InputNumberRangeSelectField defaultValue={defaultValue} min={min} max={max} onCommit={onChange}/>
                </CardActions>
            </Card>
        </GridItem>
    )
}