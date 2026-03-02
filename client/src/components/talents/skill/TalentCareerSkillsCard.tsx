import {Button, Card, CardContent, Typography} from "@mui/material";
import CenteredCardHeader from "../../common/card/header/CenteredCardHeader";
import {useState} from "react";
import {renderSkillNames} from "../../common/skill/SkillRenders";
import TalentCareerSkillDialog from "./TalentCareerSkillDialog";
import type {Skill, TalentSkills} from "../../../api/model";

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