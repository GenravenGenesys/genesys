import React from "react";
import {Grid2} from "@mui/material";

type Props = {
    children: React.ReactNode;
    centered?: boolean;
    spacing?: number;
};

const GridContainer: React.FC<Props> = ({children, centered, spacing}) => {
    return <Grid2 container spacing={spacing ?? 0}
                  sx={{justifyContent: centered ? "center" : "flex-start", width: 1}}>{children}</Grid2>;
};

export default GridContainer;