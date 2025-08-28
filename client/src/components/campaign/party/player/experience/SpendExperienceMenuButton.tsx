import type Player from "../../../../../models/actor/player/Player";
import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import SpendCharacteristicDialog from "./dialog/SpendCharacteristicDialog";
import SpendSkillDialog from "./dialog/SpendSkillDialog";
import SpendTalentDialog from "./dialog/SpendTalentDialog";

interface Props {
    player: Player;
}

const SpendExperienceMenuButton: React.FC<Props> = ({player})=> {
    const [collapse, setCollapse] = useState(false);
    const [openCharacteristicDialog, setOpenCharacteristicDialog] = useState(false);
    const [openSkillDialog, setOpenSkillDialog] = useState(false);
    const [openTalentDialog, setOpenTalentDialog] = useState(false);

    return (
        <List>
            <ListItemButton onClick={() => setCollapse(!collapse)} color='primary'>
                <ListItemText primary={player.experience.available}/>
                {collapse ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={collapse} timeout="auto" unmountOnExit>
                <List>
                    <ListItemButton onClick={() => setOpenCharacteristicDialog(true)}>
                        <ListItemText primary={'Characteristic'}/>
                        {openCharacteristicDialog && <SpendCharacteristicDialog open={openCharacteristicDialog}
                                                                                onClose={(): void => setOpenCharacteristicDialog(false)}
                                                                                currentPlayer={player}/>}
                    </ListItemButton>
                    <ListItemButton onClick={() => setOpenSkillDialog(true)}>
                        <ListItemText primary={'Skill'}/>
                        {openSkillDialog &&
                            <SpendSkillDialog open={openSkillDialog} onClose={(): void => setOpenSkillDialog(false)}
                                              currentPlayer={player}/>}
                    </ListItemButton>
                    <ListItemButton onClick={() => setOpenTalentDialog(true)}>
                        <ListItemText primary={'Talent'}/>
                        {openTalentDialog &&
                            <SpendTalentDialog open={openTalentDialog} onClose={() => setOpenTalentDialog(false)}
                                               currentPlayer={player}/>}
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    );
};

export default SpendExperienceMenuButton;