import {Button, Card, CardContent, Typography} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import {TalentSkills} from "../../../models/Talent";
import {useState} from "react";
import Skill from "../../../models/actor/Skill";
import {renderSkillNames} from "../../common/skill/SkillRenders";
import * as React from "react";
import TalentCareerSkillDialog from "./TalentCareerSkillDialog";

interface Props {
    talentSkills: TalentSkills
    updateTalentSkills: (talentSkills: TalentSkills) => void
    disabled: boolean
}

export default function TalentCareerSkillsCard(props: Props) {
    const {talentSkills, updateTalentSkills, disabled} = props;
    const [openCareerSkillDialog, setOpenCareerSkillDialog] = useState(false);

    const addSkills = async (skills: Skill[]) => {
        updateTalentSkills({...talentSkills, potentialCareerSkills: [...talentSkills.potentialCareerSkills, ...skills]});
    };

    return (
        <Card sx={{width: 1}}>
            <CenteredCardHeader title={'Potential Career Skills'}/>
            <CardContent>
                <Typography sx={{
                    textAlign: 'center'
                }}>{renderSkillNames(talentSkills.potentialCareerSkills)}</Typography>
                <Button onClick={() => setOpenCareerSkillDialog(true)} color='primary'
                        variant='contained' disabled={disabled}>Add</Button>
                {openCareerSkillDialog &&
                    <TalentCareerSkillDialog open={openCareerSkillDialog}
                                             onClose={(): void => setOpenCareerSkillDialog(false)}
                                             updateSkills={addSkills}
                                             initialSkills={talentSkills.potentialCareerSkills}/>}
            </CardContent>
        </Card>
    );
}