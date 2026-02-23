import {Alert} from "@mui/material";

interface Props {
    message: string;
}

export default function GenesysAlert(props: Props) {
    const {message} = props;
    return (
        <Alert severity="error">
            {message}
        </Alert>
    );
};