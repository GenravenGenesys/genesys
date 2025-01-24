import {CardHeader} from "@mui/material";
import * as React from "react";

interface Props {
    title: string;
}

const CenteredCardHeader: React.FC<Props> = ({title}) => {
    return <CardHeader title={title}/>;
}

export default CenteredCardHeader;
