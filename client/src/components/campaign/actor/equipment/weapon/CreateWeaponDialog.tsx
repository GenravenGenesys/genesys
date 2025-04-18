import {Dialog, DialogContent, Divider, Grid, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {ActorWeapon, Weapon, WeaponSlot} from "../../../../../models/equipment/Weapon";
import Skill, {SkillType} from "../../../../../models/actor/Skill";
import {RangeBand} from "../../../../../models/common/RangeBand";
import GenesysDialogActions from "../../../../common/dialog/GenesysDialogActions";
import {useFetchSkillsByType} from "../../../../skills/SkillWorkflow";
import {ActorSkill} from "../../../../../models/actor/Actor";
import {useLocation} from "react-router-dom";
import SkillAutocompleteCard from "../../../../common/card/SkillAutocompleteCard";
import RangeBandCard from "../../../../common/card/select/RangeBandCard";
import NumberTextFieldCard from "../../../../common/card/NumberTextField";
import BooleanTextFieldCard from "../../../../common/card/BooleanTextFieldCard";
import WeaponDamageTextFieldCard from "../../../../common/card/WeaponDamageTextFieldCard";
import WeaponQualityCard from "../../../equipment/weapon/quality/WeaponQualityCard";
import WeaponModifierCard from "../../../equipment/weapon/modifier/WeaponModifierCard";
import CenteredDialogTitle from "../../../../common/dialog/CenteredDialogTitle";

interface Props {
    open: boolean;
    onCreateWeapon: (weapon: ActorWeapon) => void;
    onClose: () => void;
}

const CreateWeaponDialog: React.FC<Props> = ({open, onCreateWeapon, onClose})=> {
    const [weapon, setWeapon] = useState<ActorWeapon>({
        slot: WeaponSlot.None,
        id: 'custom',
        modifiers: [],
        name: 'Default',
        price: 0,
        rarity: 0,
        restricted: false,
        encumbrance: 0,
        description: '',
        qualities: [],
        brawn: false,
        damage: 0,
        critical: 3,
        hands: 1,
        range: RangeBand.Engaged,
        skill: {} as ActorSkill
    })
    let pathname = useLocation().pathname;

    const onCreate = async (): Promise<void> => {
        onCreateWeapon({...weapon, slot: WeaponSlot.None} as ActorWeapon);
        onClose();
    };

    const handleNameChange = (value: string) => {
        setWeapon({...weapon, name: value});
    };

    const handleSkillChange = async (value: Skill) => {
        setWeapon({...weapon, skill: value});
    };

    const handleRangeBandChange = async (value: RangeBand) => {
        setWeapon({...weapon, range: value});
    };

    const handleHandsChange = async (value: number) => {
        setWeapon({...weapon, hands: value});
    };

    const handleDamageChange = async (value: number) => {
        setWeapon({...weapon, damage: value});
    };

    const handleBrawnChange = async (value: boolean) => {
        setWeapon({...weapon, brawn: value});
    };

    const handleCriticalChange = async (value: number) => {
        setWeapon({...weapon, critical: value});
    };

    const updateWeapon = (updatedWeapon: Weapon) => {
        setWeapon({...updatedWeapon, slot: WeaponSlot.None});
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <CenteredDialogTitle title={'Add Custom Weapon'}/>
            <DialogContent>
                <Grid container>
                    <TextField
                        value={weapon.name}
                        variant="outlined"
                        fullWidth
                        label={'Name'}
                        onChange={e => handleNameChange(e.target.value)}
                    />
                </Grid>
                <Divider/>
                <Grid container spacing={2}>
                    <SkillAutocompleteCard disabled={pathname.endsWith('/view')} handleSkillChange={handleSkillChange}
                                           skills={useFetchSkillsByType(SkillType.Combat)}
                                           startingSkill={weapon.skill} title={'Required Skill'}/>
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
                    <RangeBandCard value={weapon.range} onChange={handleRangeBandChange}
                                   disabled={pathname.endsWith('/view')}/>
                </Grid>
                <Grid container>
                    <WeaponQualityCard weapon={weapon} updateWeapon={updateWeapon}
                                       disabled={pathname.endsWith('/view')}/>
                    <WeaponModifierCard weapon={weapon} updateWeapon={updateWeapon}
                                        disabled={pathname.endsWith('/view')}/>
                </Grid>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    );
};

export default CreateWeaponDialog;