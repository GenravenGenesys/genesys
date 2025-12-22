import {useLocation, useParams} from "react-router";
import {Fragment, useEffect, useState} from "react";
import type {Difficulty, Spell} from "../../api/model";
import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
import CenteredCardHeaderWithAction from "../common/card/header/CenteredCardHeaderWithAction.tsx";
import {RootPath} from "../../services/RootPath.ts";
import GridContainer from "../common/grid/GridContainer.tsx";
import {getSpellController} from "../../api/generated/spell-controller/spell-controller.ts";
import DifficultyCard from "../common/card/select/DifficultyCard.tsx";
import SpellSkillCard from "./SpellSkillCard.tsx";
import SpellEffectCard from "./effect/SpellEffectCard.tsx";
import TextFieldCard from "../common/card/TextFieldCard.tsx";
import BooleanTextFieldCard from "../common/card/BooleanTextFieldCard.tsx";
import SkillService from "../../services/SkillService.ts";

const SpellPage = () => {
    const {id} = useParams<{ id: string }>();
    const [spell, setSpell] = useState<Spell | null>(null);
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
                const response = await getSpellController().getSpell(id);
                setSpell(response);
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

    if (!spell || !id) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (value: string) => {
        if (spell) {
            await updateQuality({...spell, description: value});
        }
    };

    const handleDifficultyChange = async (value: Difficulty) => {
        if (spell) {
            await updateQuality({...spell, difficulty: value});
        }
    };

    const handleConcentrationUpdate = async (value: boolean) => {
        if (spell) {
            await updateQuality({...spell, concentration: value});
        }
    };

    const onSkillAddition = async (name: string) => {
        const copySpell = {...spell} as Spell
        const skill = await SkillService.getSkill(name)
        copySpell.skills = copySpell.skills!.concat(skill)
        await updateQuality(copySpell)
    }

    const onSkillRemoval = async (name: string) => {
        const copySpell = {...spell} as Spell
        copySpell.skills!.forEach((skill, index) => {
            if (skill.name === name) {
                copySpell.skills!.splice(index, 1)
            }
        })
        await updateQuality(copySpell)
    }

    const updateQuality = async (updatedSpell: Spell) => {
        if (updatedSpell) {
            setSpell(await getSpellController().updateSpell(id, updatedSpell));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={spell.name!} path={RootPath.Spell + spell.id}/>
            <CardContent>
                <GridContainer centered>
                    <GridContainer centered>
                        <TextFieldCard title={"Description"} value={spell.description!}
                                       disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>
                    </GridContainer>
                    <GridContainer spacing={2}>
                        <DifficultyCard value={spell.difficulty!} onChange={handleDifficultyChange} disabled={pathname.endsWith('/view')}/>
                        <BooleanTextFieldCard title={"Concentration"} value={spell.concentration!}
                                              disabled={pathname.endsWith('/view')}
                                              onChange={handleConcentrationUpdate}/>
                    </GridContainer>
                    <GridContainer spacing={2}>
                        <SpellSkillCard spell={spell} onSkillAddition={onSkillAddition}
                                        onSkillRemoval={onSkillRemoval}/>
                    </GridContainer>
                    <GridContainer spacing={2}>
                        <SpellEffectCard spell={spell}/>
                    </GridContainer>
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default SpellPage;