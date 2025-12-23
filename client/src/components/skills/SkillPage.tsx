import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import {RootPath} from "../../services/RootPath";
import {useLocation, useParams} from "react-router";
import {Fragment, useEffect, useState} from "react";
import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction";
import SkillTypeCard from "../common/card/select/SkillTypeCard";
import CharacteristicTypeCard from "../common/card/select/CharacteristicTypeCard";
import BooleanTextFieldCard from "../common/card/BooleanTextFieldCard";
import GridContainer from "../common/grid/GridContainer";
import {getSkillController} from "../../api/generated/skill-controller/skill-controller.ts";
import type {CharacteristicType, Skill, SkillType} from "../../api/model";

const SkillPage = ()=> {
    const {id} = useParams<{ id: string }>();
    const [skill, setSkill] = useState<Skill | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getSkillController().getSkill(id);
                setSkill(response);
            } catch (err) {
                setError('Failed to load injury.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    if (!skill || !id) {
        return <Fragment/>;
    }

    const handleSkillTypeChange = async (value: SkillType) => {
        if (skill) {
            await updateSkill({...skill, type: value});
        }
    };

    const handleCharacteristicTypeChange = async (value: CharacteristicType) => {
        if (skill) {
            await updateSkill({...skill, characteristic: value});
        }
    };

    const handleInitiativeSkillChange = async (value: boolean) => {
        if (skill) {
            await updateSkill({...skill, initiative: value});
        }
    };

    const updateSkill = async (updatedSkill: Skill) => {
        setSkill(await getSkillController().updateSkill(updatedSkill.id, updatedSkill));
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={skill.name} path={RootPath.Skills + skill.id}/>
            <CardContent>
                <GridContainer centered>
                    <SkillTypeCard value={skill.type} onChange={handleSkillTypeChange}
                                   disabled={pathname.endsWith('/view')}/>
                    <CharacteristicTypeCard value={skill.characteristic} onChange={handleCharacteristicTypeChange}
                                            disabled={pathname.endsWith('/view')}/>
                    <BooleanTextFieldCard title={'Initiative Skill'} value={skill.initiative}
                                          disabled={pathname.endsWith('/view')} onChange={handleInitiativeSkillChange}/>
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default SkillPage;