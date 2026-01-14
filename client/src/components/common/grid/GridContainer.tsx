import React from "react";
import {Grid} from "@mui/material";

interface Props {
    children: React.ReactNode;
    centered?: boolean;
    spacing?: number;
    columns?: number;
}

const GridContainer: React.FC<Props> = ({children, centered, spacing, columns}) => {
    return <Grid container spacing={spacing ?? 0} columns={columns}
                  sx={{justifyContent: centered ? "center" : "flex-start", width: 1}}>{children}</Grid>;
};

export default GridContainer;