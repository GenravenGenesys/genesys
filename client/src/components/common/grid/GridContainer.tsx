import React from "react";
import {Grid2} from "@mui/material";

type Props = {
    children: React.ReactNode;
    centered?: boolean;
};

const GridContainer: React.FC<Props> = ({children, centered}) => {
    return <Grid2 container sx={{justifyContent: centered ? "center" : "flex-start"}}>{children}</Grid2>;
};

export default GridContainer;