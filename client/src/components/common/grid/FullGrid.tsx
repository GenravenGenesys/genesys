import {Grid2} from "@mui/material";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const FullGrid: React.FC<Props> = ({children}) => {
    return <Grid2 sx={{width: 1}}>{children}</Grid2>
};

export default FullGrid;