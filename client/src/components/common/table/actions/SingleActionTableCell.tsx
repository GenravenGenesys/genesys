import {forwardRef, useMemo} from "react";
import {Link, type LinkProps} from "react-router-dom";
import * as React from "react";
import {IconButton} from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import CustomTableCell from "../common/CustomTableCell";

type Props = {
    name: string;
    path: string;
};

const SingleActionTableCell: React.FC<Props> = ({name, path})=> {
    const handleView = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={`${path}${name}`} ref={ref} {...itemProps} />
    )), [path, name]);

    return (
        <CustomTableCell centered>
            <IconButton title='View' size='small' component={handleView} style={{textAlign: 'center'}}>
                <PreviewIcon color='primary' fontSize='small'/>
            </IconButton>
        </CustomTableCell>
    );
};

export default SingleActionTableCell;