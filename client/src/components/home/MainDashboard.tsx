import {Card, CardContent} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import CreateSkillDialog from "../skills/CreateSkillDialog";
import ExpansionList from "../navigation/ExpansionList";
import CenteredCardHeader from "../common/card/header/CenteredCardHeader";
import CreateInjuryDialog from "../injuries/CreateInjuryDialog";
import CreateSpellDialog from "../spell/CreateSpellDialog";
import {RootPath} from "../../services/RootPath";
import TalentDialog from "../talents/CreateTalentDialog";
import QualityDialog from "../qualities/CreateQualityDialog";
import GridContainer from "../common/grid/GridContainer";

export default function MainDashboard() {
    const [openTalentCreationDialog, setOpenTalentCreationDialog] = useState(false)
    const [openQualityCreationDialog, setOpenQualityCreationDialog] = useState(false)
    const [openSkillCreationDialog, setOpenSkillCreationDialog] = useState(false)
    const [openInjuryCreationDialog, setOpenInjuryCreationDialog] = useState(false)
    const [openSpellCreationDialog, setOpenSpellCreationDialog] = useState(false)

    return (
        <Card>
            <CardContent>
                <GridContainer centered>
                    <Card>
                        <CenteredCardHeader title={'Campaign Information'}/>
                        <CardContent>
                            <GridContainer centered>
                                <ExpansionList header={'Talents'} viewTitle={'View All Talents'} to={RootPath.Talent}
                                               dialogTitle={'Create Talent'}
                                               onClick={(): void => setOpenTalentCreationDialog(true)}/>
                                <ExpansionList header={'Skills'} viewTitle={'View All Skills'} to={RootPath.Skills}
                                               dialogTitle={'Create Skill'}
                                               onClick={(): void => setOpenSkillCreationDialog(true)}/>
                            </GridContainer>
                        </CardContent>
                    </Card>
                </GridContainer>
                <GridContainer centered>
                    <Card>
                        <CenteredCardHeader title={'System Information'}/>
                        <CardContent>
                            <GridContainer centered>
                                <ExpansionList header={'Critical Injuries'} viewTitle={'View All Critical Injuries'} to={RootPath.Injury}
                                               dialogTitle={'Create Critical Injury'}
                                               onClick={(): void => setOpenInjuryCreationDialog(true)}/>
                                <ExpansionList header={'Spells'} viewTitle={'View All Spells'} to={RootPath.Spell}
                                               dialogTitle={'Create Spell'}
                                               onClick={(): void => setOpenSpellCreationDialog(true)}/>
                                <ExpansionList header={'Qualities'} viewTitle={'View All Qualities'} to={RootPath.Qualities}
                                               dialogTitle={'Create Quality'}
                                               onClick={(): void => setOpenQualityCreationDialog(true)}/>
                            </GridContainer>
                        </CardContent>
                    </Card>
                </GridContainer>
            </CardContent>
            {openTalentCreationDialog && <TalentDialog open={openTalentCreationDialog}
                                                       onClose={(): void => setOpenTalentCreationDialog(false)}/>}
            {openQualityCreationDialog && <QualityDialog open={openQualityCreationDialog}
                                                         onClose={(): void => setOpenQualityCreationDialog(false)}/>}
            {openSkillCreationDialog && <CreateSkillDialog open={openSkillCreationDialog}
                                                            onClose={(): void => setOpenSkillCreationDialog(false)}/>}
            {openInjuryCreationDialog && <CreateInjuryDialog open={openInjuryCreationDialog}
                                                            onClose={(): void => setOpenInjuryCreationDialog(false)}/>}
            {openSpellCreationDialog && <CreateSpellDialog open={openSpellCreationDialog}
                                                            onClose={(): void => setOpenSpellCreationDialog(false)}/>}
        </Card>
    );
}