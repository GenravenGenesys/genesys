import { DialogTitle } from "@mui/material";
import * as React from "react";

interface Props {
    title: string;
}

const CenteredDialogTitle: React.FC<Props> = ({ title }) => {
    return <DialogTitle style={{ textAlign: "center" }}>{title}</DialogTitle>;
}

export default CenteredDialogTitle;
