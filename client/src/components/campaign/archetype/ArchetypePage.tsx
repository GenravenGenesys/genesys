import {Card, CardContent, Grid} from '@mui/material';
import {useLocation, useParams} from 'react-router-dom';
import * as React from "react";
import Archetype from "../../../models/actor/player/Archetype";
import {RootPath} from "../../../services/RootPath";
import {CharacteristicType} from "../../../models/actor/Characteristic";
import {Fragment, useEffect, useState} from "react";
import SkillService from "../../../services/SkillService";
import ArchetypeService from "../../../services/ArchetypeService";
import Skill from "../../../models/actor/Skill";
import NumberTextFieldCard from "../../common/card/NumberTextField";
import TextFieldCard from "../../common/card/TextFieldCard";
import CenteredCardHeaderWithAction from "../../common/card/header/CenteredCardHeaderWithAction";
import SkillAutocompleteCard from "../../common/card/SkillAutocompleteCard";
import CharacteristicCard from "../../common/card/CharacteristicCard";
import ArchetypeAbilityCard from "./ability/ArchetypeAbilityCard";

const ArchetypePage = ()=> {
    const {id} = useParams<{ id: string }>();
    const [archetype, setArchetype] = useState<Archetype | null>(null);
    const [skills, setSkills] = useState<Skill[]>([]);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setArchetype(await ArchetypeService.getArchetype(id))
        })()
    }, [id, setArchetype])

    useEffect(() => {
        (async (): Promise<void> => {
            setSkills(await SkillService.getSkills())
        })()
    }, [])

    if (!archetype) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, description: event.target.value}));
        }
    };

    const handleCharacteristicChange = async (characteristic: CharacteristicType, value: number) => {
        if (archetype) {
            switch (characteristic) {
                case CharacteristicType.Brawn:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, brawn: value}));
                    break;
                case CharacteristicType.Agility:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, agility: value}));
                    break;
                case CharacteristicType.Intellect:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, intellect: value}));
                    break;
                case CharacteristicType.Cunning:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, cunning: value}));
                    break;
                case CharacteristicType.Willpower:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, willpower: value}));
                    break;
                case CharacteristicType.Presence:
                    setArchetype(await ArchetypeService.updateArchetype({...archetype, presence: value}));
                    break;
            }
        }
    };

    const handleSkillChange = async (value: Skill) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, skill: value}));
        }
    };

    const handleWoundsChange = async (value: number) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, wounds: value}));
        }
    };

    const handleStrainChange = async (value: number) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, strain: value}));
        }
    };

    const handleExperienceChange = async (value: number) => {
        if (archetype) {
            setArchetype(await ArchetypeService.updateArchetype({...archetype, experience: value}));
        }
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={archetype.name} path={RootPath.Archetype + archetype.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container justifyContent={'center'}>
                        <TextFieldCard title={"Description"} value={archetype.description}
                                       disabled={!pathname.endsWith(archetype.id + '/edit')}
                                       onChange={handleDescriptionChange}/>
                    </Grid>
                    <Grid container spacing={2}>
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
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <NumberTextFieldCard title={"Wound Threshold"} value={archetype.wounds}
                                             onChange={handleWoundsChange} min={7} max={13}
                                             disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                        <NumberTextFieldCard title={"Strain Threshold"} value={archetype.strain}
                                             onChange={handleStrainChange} min={7} max={13}
                                             disabled={!pathname.endsWith(archetype.id + '/edit')}/>
                        <NumberTextFieldCard title={"Base Experience"} value={archetype.experience}
                                             onChange={handleExperienceChange} min={70} max={170}
                                             disabled={!pathname.endsWith(archetype.id + '/edit')} steps={5}/>
                    </Grid>
                    <Grid container>
                        <SkillAutocompleteCard disabled={!pathname.endsWith(archetype.id + '/edit')}
                                               handleSkillChange={handleSkillChange} skills={skills}
                                               startingSkill={archetype.skill} title={'Starting Skill'}/>
                    </Grid>
                </Grid>
                <ArchetypeAbilityCard archetype={archetype}/>
            </CardContent>
        </Card>
    );
};

export default ArchetypePage;
