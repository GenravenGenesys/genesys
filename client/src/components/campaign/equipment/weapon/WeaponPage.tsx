import {Card, CardContent} from '@mui/material';
import * as React from "react";
import {Fragment, useEffect, useState} from "react";
import {useLocation, useParams} from "react-router";
import WeaponQualityCard from "./quality/WeaponQualityCard";
import WeaponModifierCard from "./modifier/WeaponModifierCard";
import { Weapon } from '../../../../models/equipment/Weapon';
import {useFetchSkillsByType} from "../../../skills/SkillWorkflow";
import Skill, {SkillType} from "../../../../models/actor/Skill";
import {RangeBand} from "../../../../models/common/RangeBand";
import TextFieldCard from "../../../common/card/TextFieldCard";
import CenteredCardHeaderWithAction from "../../../common/card/header/CenteredCardHeaderWithAction";
import {EquipmentPath} from "../../../../services/RootPath";
import SkillAutocompleteCard from "../../../common/card/SkillAutocompleteCard";
import RangeBandCard from "../../../common/card/select/RangeBandCard";
import NumberTextFieldCard from "../../../common/card/NumberTextFieldCard";
import BooleanTextFieldCard from "../../../common/card/BooleanTextFieldCard";
import WeaponDamageTextFieldCard from "../../../common/card/WeaponDamageTextFieldCard";
import PriceTextFieldCard from "../../../common/card/PriceTextFieldCard";
import GridContainer from '../../../common/grid/GridContainer';
import WeaponService from "../../../../services/equipment/WeaponService";

const WeaponPage = ()=> {
    const {id} = useParams<{ id: string }>();
    const [weapon, setWeapon] = useState<Weapon | null>(null);
    const skills = useFetchSkillsByType(SkillType.Combat);
    let pathname = useLocation().pathname;

    useEffect(() => {
        if (!id) {
            return
        }
        (async (): Promise<void> => {
            setWeapon(await WeaponService.getWeapon(id));
        })()
    }, [id, setWeapon])

    if (!weapon) {
        return <Fragment/>;
    }

    const handleDescriptionChange = async (value: string) => {
        if (weapon) {
            await updateWeapon({...weapon, description: value});
        }
    };

    const handleSkillChange = async (value: Skill) => {
        if (weapon) {
            await updateWeapon({...weapon, skill: value});
        }
    };

    const handleHandsChange = async (value: number) => {
        if (weapon) {
            await updateWeapon({...weapon, hands: value});
        }
    };

    const handleDamageChange = async (value: number) => {
        if (weapon) {
            await updateWeapon({...weapon, damage: value});
        }
    };

    const handleBrawnChange = async (value: boolean) => {
        if (weapon) {
            await updateWeapon({...weapon, brawn: value});
        }
    };

    const handleCriticalChange = async (value: number) => {
        if (weapon) {
            await updateWeapon({...weapon, critical: value});
        }
    };

    const handleRangeBandChange = async (value: RangeBand) => {
        if (weapon) {
            await updateWeapon({...weapon, range: value});
        }
    };

    const handleEncumbranceChange = async (value: number) => {
        if (weapon) {
            await updateWeapon({...weapon, encumbrance: value});
        }
    };

    const handleRestrictedChange = async (value: boolean) => {
        if (weapon) {
            await updateWeapon({...weapon, restricted: value});
        }
    };

    const handlePriceChange = async (value: number) => {
        if (weapon) {
            await updateWeapon({...weapon, price: value});
        }
    };

    const handleRarityChange = async (value: number) => {
        if (weapon) {
            await updateWeapon({...weapon, rarity: value});
        }
    };

    const updateWeapon = async (updatedWeapon: Weapon) => {
        setWeapon(await WeaponService.updateWeapon(updatedWeapon));
    };

    return (
        <Card>
            <CenteredCardHeaderWithAction title={weapon.name} path={EquipmentPath.Weapon + weapon.id}/>
            <CardContent>
                <GridContainer centered>
                    <GridContainer centered>
                        <SkillAutocompleteCard disabled={pathname.endsWith('/view')}
                                               handleSkillChange={handleSkillChange} skills={skills}
                                               startingSkill={weapon.skill} title={'Required Skill'}/>
                        <RangeBandCard value={weapon.range} onChange={handleRangeBandChange}
                                       disabled={pathname.endsWith('/view')}/>
                    </GridContainer>
                    <GridContainer centered>
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
                    </GridContainer>
                    <GridContainer centered>
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
                    </GridContainer>
                    <GridContainer centered>
                        <TextFieldCard title={"Description"} value={weapon.description}
                                       disabled={pathname.endsWith('/view')} onChange={handleDescriptionChange}/>
                    </GridContainer>
                    <WeaponQualityCard weapon={weapon} updateWeapon={updateWeapon} disabled={pathname.endsWith('/view')}/>
                    <WeaponModifierCard weapon={weapon} updateWeapon={updateWeapon} disabled={pathname.endsWith('/view')}/>
                </GridContainer>
            </CardContent>
        </Card>
    );
};

export default WeaponPage;