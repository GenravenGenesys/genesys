import React from "react";
import {Grid2} from "@mui/material";

type GridItemProps = {
    children: React.ReactNode;
};

const GridItem: React.FC<GridItemProps> = ({ children }) => {
    return <Grid2 sx={{ flexGrow: 1 }}>{children}</Grid2>;
};

export default GridItem;
