import {Alert, Card, CardContent, CircularProgress} from '@mui/material';
import {useLocation, useParams} from 'react-router';
import {RootPath} from "../../../services/RootPath";
import {Fragment, useEffect, useState} from "react";
import NumberTextFieldCard from "../../common/card/NumberTextFieldCard";
import TextFieldCard from "../../common/card/TextFieldCard";
import CenteredCardHeaderWithAction from "../../common/card/header/CenteredCardHeaderWithAction";
import SkillAutocompleteCard from "../../common/card/SkillAutocompleteCard";
import CharacteristicCard from "../../common/card/CharacteristicCard";
import ArchetypeAbilityCard from "./ability/ArchetypeAbilityCard";
import GridContainer from "../../common/grid/GridContainer";
import {useFetchAllSkills} from "../../../hooks/useFetchAllSkills.ts";
import type {Archetype, Skill} from "../../../api/model";
import {CharacteristicType} from "../../../api/model";
import {getArchetypeController} from "../../../api/generated/archetype-controller/archetype-controller.ts";

const ArchetypePage = ()=> {
    const {id} = useParams<{ id: string }>();
    const [archetype, setArchetype] = useState<Archetype | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {skills} = useFetchAllSkills();
    const pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return;
        }
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await getArchetypeController().getArchetype(id);
                setArchetype(response);
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

    if (!archetype || !id) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (value: string) => {
        if (archetype) {
            await updateArchetype({...archetype, description: value});
        }
    };

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (archetype) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    await updateArchetype({...archetype, brawn: value});
                    break;
                case CharacteristicType.Agility:
                    await updateArchetype({...archetype, agility: value});
                    break;
                case CharacteristicType.Intellect:
                    await updateArchetype({...archetype, intellect: value});
                    break;
                case CharacteristicType.Cunning:
                    await updateArchetype({...archetype, cunning: value});
                    break;
                case CharacteristicType.Willpower:
                    await updateArchetype({...archetype, willpower: value});
                    break;
                case CharacteristicType.Presence:
                    await updateArchetype({...archetype, presence: value});
                    break;
            }
        }
    };

    const handleSkillChange = async (value: Skill) => {
        if (archetype) {
            await updateArchetype({...archetype, skill: value});
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (archetype) {
            await updateArchetype({...archetype, wounds: value});
        }
    };

    const handleStrainChange = async (value: number) => {
        if (archetype) {
            await updateArchetype({...archetype, strain: value});
        }
    };

    const handleExperienceChange = async (value: number) => {
        if (archetype) {
            await updateArchetype({...archetype, experience: value});
        }
    };

    const updateArchetype = async (updatedArchetype: Archetype) => {
        if (updatedArchetype) {
            setArchetype(await getArchetypeController().updateArchetype(updatedArchetype.id, updatedArchetype));
        }

        return (
            <Card>
                <CenteredCardHeaderWithAction title={archetype.name} path={RootPath.Archetype + archetype.id}/>
                <CardContent>
                    <GridContainer centered>
                        <GridContainer centered>
                            <TextFieldCard title={"Description"} value={archetype.description}
                                           disabled={!pathname.endsWith(archetype.id + '/edit')}
                                           onChange={handleDescriptionChange}/>
                        </GridContainer>
                        <GridContainer spacing={2}>
                            <CharacteristicCard type={CharacteristicType.Brawn} value={archetype.brawn}
                                                handleCharacteristicChange={handleCharacteristicChange}
                                                disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                            <CharacteristicCard type={CharacteristicType.Agility} value={archetype.agility}
                                                handleCharacteristicChange={handleCharacteristicChange}
                                                disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                            <CharacteristicCard type={CharacteristicType.Intellect} value={archetype.intellect}
                                                handleCharacteristicChange={handleCharacteristicChange}
                                                disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                            <CharacteristicCard type={CharacteristicType.Cunning} value={archetype.cunning}
                                                handleCharacteristicChange={handleCharacteristicChange}
                                                disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                            <CharacteristicCard type={CharacteristicType.Willpower} value={archetype.willpower}
                                                handleCharacteristicChange={handleCharacteristicChange}
                                                disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                            <CharacteristicCard type={CharacteristicType.Presence} value={archetype.presence}
                                                handleCharacteristicChange={handleCharacteristicChange}
                                                disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                        </GridContainer>
                        <GridContainer centered>
                            <NumberTextFieldCard title={"Wound Threshold"} value={archetype.wounds}
                                                 onChange={handleWoundsChange} min={7} max={13}
                                                 disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                            <NumberTextFieldCard title={"Strain Threshold"} value={archetype.strain}
                                                 onChange={handleStrainChange} min={7} max={13}
                                                 disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                            <NumberTextFieldCard title={"Base Experience"} value={archetype.experience}
                                                 onChange={handleExperienceChange} min={70} max={170}
                                                 disabled={!pathname.endsWith(archetype.id + '/edit')} steps={5}/>
                        </GridContainer>
                        <GridContainer>
                            <SkillAutocompleteCard disabled={!pathname.endsWith(archetype.id + '/edit')}
                                                   handleSkillChange={handleSkillChange} skills={skills}
                                                   startingSkill={archetype.skill} title={'Starting Skill'}/>
                        </GridContainer>
                    </GridContainer>
                    <ArchetypeAbilityCard archetype={archetype}/>
                </CardContent>
            </Card>
        );
    };
};

export default ArchetypePage;
