import {Grid} from "@mui/material";
import React from "react";

type Props = {
    children: React.ReactNode;
};

const FullGrid: React.FC<Props> = ({children}) => {
    return <Grid sx={{width: 1}}>{children}</Grid>
};

export default FullGrid;