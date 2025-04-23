import React from "react";
import {Grid2} from "@mui/material";

type Props = {
    children: React.ReactNode;
    centered?: boolean;
    spacing?: number;
    columns?: number;
};

const GridContainer: React.FC<Props> = ({children, centered, spacing, columns}) => {
    return <Grid2 container spacing={spacing ?? 0} columns={columns}
                  sx={{justifyContent: centered ? "center" : "flex-start", width: 1}}>{children}</Grid2>;
};

export default GridContainer;