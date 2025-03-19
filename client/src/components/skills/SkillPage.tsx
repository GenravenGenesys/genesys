import Skill, {SkillType} from "../../models/actor/Skill";
import {Card, CardContent, Grid} from "@mui/material";
import {RootPath} from "../../services/RootPath";
import * as React from "react";
import {useLocation, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import SkillService from "../../services/SkillService";
import {CharacteristicType} from "../../models/actor/Characteristic";
import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction";
import SkillTypeCard from "../common/card/select/SkillTypeCard";
import CharacteristicTypeCard from "../common/card/select/CharacteristicTypeCard";
import BooleanTextFieldCard from "../common/card/BooleanTextFieldCard";

const SkillPage = ()=> {
    const {id} = useParams<{ id: string }>();
    const [skill, setSkill] = useState<Skill | null>(null);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return;
        }
        (async (): Promise<void> => {
            setSkill(await SkillService.getSkill(id));
        })()
    }, [id, setSkill]);

    if (!skill) {
        return <Fragment/>;
    }

    const handleSkillTypeChange = async (value: SkillType) => {
        if (skill) {
            setSkill(await SkillService.updateSkill({...skill, type: value}));
        }
    };

    const handleCharacteristicTypeChange = async (value: CharacteristicType) => {
        if (skill) {
            setSkill(await SkillService.updateSkill({...skill, characteristic: value}));
        }
    };

    const handleInitiativeSkillChange = async (value: boolean) => {
        if (skill) {
            setSkill(await SkillService.updateSkill({...skill, initiative: value}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={skill.name} path={RootPath.Skills + skill.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <SkillTypeCard value={skill.type} onChange={handleSkillTypeChange}
                                   disabled={pathname.endsWith('/view')}/>
                    <CharacteristicTypeCard value={skill.characteristic} onChange={handleCharacteristicTypeChange}
                                            disabled={pathname.endsWith('/view')}/>
                    <BooleanTextFieldCard title={'Initiative Skill'} value={skill.initiative}
                                          disabled={pathname.endsWith('/view')} onChange={handleInitiativeSkillChange}/>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default SkillPage;