import {Card, CardContent, Grid,} from '@mui/material';
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router-dom";
import WeaponQualityCard from "./quality/WeaponQualityCard";
import WeaponModifierCard from "./modifier/WeaponModifierCard";
import { Weapon } from '../../../../models/equipment/Weapon';
import {useFetchSkillsByType} from "../../../skills/SkillWorkflow";
import Skill, {SkillType} from "../../../../models/actor/Skill";
import EquipmentService from "../../../../services/EquipmentService";
import {RangeBand} from "../../../../models/common/RangeBand";
import {ViewFieldCard} from "../../../common/ViewFieldCard";
import {TextFieldCard} from "../../../common/card/TextFieldCard";
import CenteredCardHeaderWithAction from "../../../common/card/CenteredCardHeaderWithAction";
import {EquipmentPath} from "../../../../services/RootPath";
import SkillAutocompleteCard from "../../../common/card/SkillAutocompleteCard";
import RangeBandCard from "../../../common/card/select/RangeBandCard";
import {NumberTextFieldCard} from "../../../common/card/NumberTextField";
import {BooleanTextFieldCard} from "../../../common/card/BooleanTextFieldCard";
import WeaponDamageTextFieldCard from "../../../common/card/WeaponDamageTextFieldCard";
import PriceTextFieldCard from "../../../common/card/PriceTextFieldCard";

export default function WeaponPage() {
    const {id} = useParams<{ id: string }>();
    const [weapon, setWeapon] = useState<Weapon | null>(null);
    const skills = useFetchSkillsByType(SkillType.Combat);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setWeapon(await EquipmentService.getWeapon(id));
        })()
    }, [id, setWeapon])

    if (!weapon) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, description: event.target.value}));
        }
    };

    const handleSkillChange = async (value: Skill) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, skill: value}));
        }
    };

    const handleHandsChange = async (value: number) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, hands: value}));
        }
    };

    const handleDamageChange = async (value: number) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, damage: value}));
        }
    };

    const handleBrawnChange = async (value: boolean) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, brawn: value}));
        }
    };

    const handleCriticalChange = async (value: number) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, critical: value}));
        }
    };

    const handleRangeBandChange = async (value: RangeBand) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, range: value}));
        }
    };

    const handleEncumbranceChange = async (value: number) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, encumbrance: value}));
        }
    };

    const handleRestrictedChange = async (value: boolean) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, restricted: value}));
        }
    };

    const handlePriceChange = async (value: number) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, price: value}));
        }
    };

    const handleRarityChange = async (value: number) => {
        if (weapon) {
            setWeapon(await EquipmentService.updateWeapon({...weapon, rarity: value}));
        }
    };

    const renderDescriptionCard = () => {
        return pathname.endsWith('/view') ? <ViewFieldCard name={"Description"} value={weapon.description}/> :
            <TextFieldCard title={"Description"} value={weapon.description}
                           disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>;
    };

    const updateWeapon = async (updatedWeapon: Weapon) => {
        setWeapon(await EquipmentService.updateWeapon(updatedWeapon));
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={weapon.name} path={EquipmentPath.Weapon + weapon.id}/>
            <CardContent>
                <Grid container justifyContent={'center'}>
                    <Grid container justifyContent={'center'}>
                        <SkillAutocompleteCard disabled={pathname.endsWith('/view')}
                                               handleSkillChange={handleSkillChange} skills={skills}
                                               startingSkill={weapon.skill}/>
                        <RangeBandCard value={weapon.range} onChange={handleRangeBandChange}
                                       disabled={pathname.endsWith('/view')}/>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <NumberTextFieldCard title={'Hands'} value={weapon.hands} onChange={handleHandsChange} min={1}
                                             max={2} disabled={pathname.endsWith('/view')}/>
                        <BooleanTextFieldCard title={'Brawn Powered'} value={weapon.brawn}
                                              disabled={pathname.endsWith('/view')} onChange={handleBrawnChange}/>
                        <WeaponDamageTextFieldCard damage={weapon.damage} brawn={weapon.brawn}
                                                   onChange={handleDamageChange} min={0} max={15}
                                                   disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={'Critical'} value={weapon.critical} onChange={handleCriticalChange}
                                             min={1}
                                             max={6} disabled={pathname.endsWith('/view')}/>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <NumberTextFieldCard title={'Encumbrance'} value={weapon.encumbrance}
                                             onChange={handleEncumbranceChange} min={1}
                                             max={10} disabled={pathname.endsWith('/view')}/>
                        <BooleanTextFieldCard title={'Restricted'} value={weapon.restricted}
                                              disabled={pathname.endsWith('/view')} onChange={handleRestrictedChange}/>
                        <PriceTextFieldCard price={weapon.price} restricted={weapon.restricted}
                                            onChange={handlePriceChange} min={1} max={10000000}
                                            disabled={pathname.endsWith('/view')}/>
                        <NumberTextFieldCard title={'Rarity'} value={weapon.rarity} onChange={handleRarityChange}
                                             min={0}
                                             max={10} disabled={pathname.endsWith('/view')}/>
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        {renderDescriptionCard()}
                    </Grid>
                    <WeaponQualityCard weapon={weapon} updateWeapon={updateWeapon} disabled={pathname.endsWith('/view')}/>
                    <WeaponModifierCard weapon={weapon} updateWeapon={updateWeapon} disabled={pathname.endsWith('/view')}/>
                </Grid>
            </CardContent>
        </Card>
    )
}
