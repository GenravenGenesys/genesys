import { forwardRef, useMemo } from "react";
import { Link, type LinkProps, useNavigate } from "react-router";
import * as React from "react";
import { Button, IconButton, TableRow, Typography } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import CustomTableCell from "../common/CustomTableCell";
import type CampaignSession from "../../../../models/campaign/CampaignSession";
import type Scene from "../../../../models/campaign/Scene";
import { CampaignPath } from "../../../../services/RootPath";
import SessionService from "../../../../services/SessionService";

type Props = {
    session: CampaignSession;
    scene: Scene;
};

const SceneStartActionTableRow: React.FC<Props> = ({ session, scene }) => {
    let navigate = useNavigate();

    const handleView = useMemo(() => forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref): React.ReactElement => (
        <Link to={`${CampaignPath.Scene}${scene.id}`} ref={ref} {...itemProps} />
    )), [CampaignPath.Scene, scene.id]);

    const startScene = async () => {
        await SessionService.startScene(session.name, scene.id);
        navigate(CampaignPath.Scene + scene.id);
    };

    return (
        <TableRow key={scene.id}>
            <CustomTableCell>
                <Typography>{scene.name}</Typography>
            </CustomTableCell>
            <CustomTableCell centered>
                <Button variant='contained' color='primary' onClick={startScene}>Start Scene</Button>
            </CustomTableCell>
            <CustomTableCell centered>
                <IconButton title='View' size='small' component={handleView} style={{ textAlign: 'center' }}>
                    <PreviewIcon color='primary' fontSize='small' />
                </IconButton>
            </CustomTableCell>
        </TableRow>

    );
};

export default SceneStartActionTableRow;