import React from "react";
import {Grid} from "@mui/material";

type GridItemProps = {
    children: React.ReactNode;
    width?: number;
};

const GridItem: React.FC<GridItemProps> = ({ children, width }) => {
    return <Grid sx={{ flexGrow: 1, width: width }}>{children}</Grid>;
};

export default GridItem;
