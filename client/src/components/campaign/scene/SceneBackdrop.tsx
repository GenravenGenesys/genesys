import Backdrop from "@mui/material/Backdrop";
import {Card, CardContent, CardHeader} from "@mui/material";
import * as React from "react";
import Scene from "../../../models/campaign/Scene";

interface Props {
    scene: Scene
    open: boolean
    onClose: () => void
}

export default function SceneBackdrop(props: Props) {
    const {scene, open, onClose} = props;

    return (
        <Backdrop sx={theme => ({
            color: '#fff',
            zIndex: theme.zIndex.drawer + 1
        })} open={open} onClick={onClose}>
            <Card>
                <CardHeader style={{textAlign: 'center'}} title={scene.name}/>
                <CardContent>

                </CardContent>
            </Card>
        </Backdrop>
    );
}