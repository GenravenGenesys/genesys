import {CardHeader} from "@mui/material";
import GenesysDescriptionTypography from "../typography/GenesysDescriptionTypography";
import * as React from "react";
import {DieType} from "../../../models/Roll";

interface Props {
    type: DieType
}

export default function GenesysCenteredCardHeader(props: Props): JSX.Element {
    const {type} = props

    return (
        <CardHeader style={{textAlign: 'center'}} title={<GenesysDescriptionTypography text={String(type)}/>}/>
    )
}