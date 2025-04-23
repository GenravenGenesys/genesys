import React from "react";
import {Grid2} from "@mui/material";

type GridItemProps = {
    children: React.ReactNode;
    width?: number;
};

const GridItem: React.FC<GridItemProps> = ({ children, width }) => {
    return <Grid2 sx={{ flexGrow: 1, width: width }}>{children}</Grid2>;
};

export default GridItem;
