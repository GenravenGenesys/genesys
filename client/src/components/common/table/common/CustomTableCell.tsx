import React from "react";
import {TableCell} from "@mui/material";

type Props = {
    children: React.ReactNode;
    centered? : boolean;
    span?: number;
    width?: number;
};

const CustomTableCell: React.FC<Props> = ({children, centered, span, width}) => {
    return <TableCell sx={{textAlign: centered ? 'center' : 'left', width}} colSpan={span}>{children}</TableCell>;
};

export default CustomTableCell;