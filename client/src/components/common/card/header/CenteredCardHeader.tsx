import {CardHeader} from "@mui/material";
import * as React from "react";

type Props = {
    title: string;
    subheader?: React.ReactNode;
};

const CenteredCardHeader: React.FC<Props> = ({title, subheader}) => {
    return <CardHeader title={title} style={{textAlign: 'center'}} subheader={subheader}/>;
}

export default CenteredCardHeader;
