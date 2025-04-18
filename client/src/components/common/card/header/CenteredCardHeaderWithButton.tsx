import {Button, CardHeader} from "@mui/material";
import * as React from "react";

interface Props {
    title: string
    onClick: () => void
    buttonText: string
}

const CenteredCardHeaderWithButton: React.FC<Props> = ({title, onClick, buttonText}) => {
    return <CardHeader style={{textAlign: 'center'}} title={title}
                       action={<Button color='primary' variant='contained' onClick={onClick}>{buttonText}</Button>}/>;
};

export default CenteredCardHeaderWithButton;