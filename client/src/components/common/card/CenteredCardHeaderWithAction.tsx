import {CardHeader, IconButton} from "@mui/material";
import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import {useLocation, useNavigate} from "react-router-dom";

interface Props {
    title: string
    path: string
    subheader?: string
}

export default function CenteredCardHeaderWithAction(props: Props) {
    const {title, path, subheader} = props;
    let pathname = useLocation().pathname;
    let navigate = useNavigate();

    const onPageChange = () => {
        if (pathname.endsWith('/view')) {
            return (
                <IconButton title='Edit' size='small'
                            onClick={(): void => navigate(path + '/edit')}>
                    <EditIcon color='primary' fontSize='small'/>
                </IconButton>
            );
        } else {
            return (
                <IconButton title='View' size='small'
                            onClick={(): void => navigate(path + '/view')}>
                    <CheckIcon color='primary' fontSize='small'/>
                </IconButton>
            );
        }
    };

    return (
        <CardHeader style={{textAlign: 'center'}} title={title} action={onPageChange()} subheader={subheader}/>
    );
}