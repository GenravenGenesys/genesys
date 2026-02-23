import {Link} from 'react-router-dom';
import {Button} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

interface Props {
    to: string;
    text: string;
}

const RouterLinkButton = (props: Props) => {
    const {to, text} = props;

    return (
        <Button
            component={Link}
            to={to}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            variant="outlined"
            size="small"
            startIcon={<OpenInNewIcon/>}
        >
            {text}
        </Button>
    );
};

export default RouterLinkButton;