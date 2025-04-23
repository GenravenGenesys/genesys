import {Card, CardContent} from "@mui/material";
import InlineNumberField from "./NumberField";
import CenteredCardHeader from "./card/header/CenteredCardHeader";
import GridItem from "./grid/GridItem";

interface Props {
    title: string
    value: number
    onChange: (value: number) => void
}

export default function EditNumberCard(props: Props): JSX.Element {
    const {onChange, value, title} = props

    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <InlineNumberField defaultValue={value} onCommit={onChange} />
                </CardContent>
            </Card>
        </GridItem>
    )
}