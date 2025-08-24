import {ExpandLess, ExpandMore} from "@mui/icons-material";
import {List, ListItemText, Collapse, ListItemButton} from "@mui/material";
import {forwardRef, type ReactElement, useMemo, useState} from "react";
import {Link, type LinkProps} from "react-router-dom";

interface Props {
    header: string
    viewTitle: string
    to: string
    dialogTitle: string
    onClick: () => void
}

export default function ExpansionList(props: Props) {
    const {header, viewTitle, to, dialogTitle, onClick} = props;
    const [collapse, setCollapse] = useState(false);

    const renderLink = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): ReactElement => (
        <Link to={to} ref={ref} {...itemProps} />
    )), [to]);

    return (
        <List>
            <ListItemButton onClick={() => setCollapse(!collapse)} color='primary'>
                <ListItemText primary={header}/>
                {collapse ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={collapse} timeout="auto" unmountOnExit>
                <List>
                    <ListItemButton component={renderLink}>
                        <ListItemText primary={viewTitle}/>
                    </ListItemButton>
                    <ListItemButton>
                        <ListItemText primary={dialogTitle} onClick={onClick}/>
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
};