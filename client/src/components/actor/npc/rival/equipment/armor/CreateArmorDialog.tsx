import {Dialog, DialogContent, DialogTitle, Grid, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {GenesysDialogActions} from "../../../../../common/dialog/GenesysDialogActions";
import {ActorArmor, Armor, ArmorSlot} from "../../../../../../models/equipment/Armor";
import SoakCard from "../../../../../common/card/SoakCard";
import DefenseCard from "../../../../../common/card/DefenseCard";
import ArmorQualityCard from "../../../../../equipment/armor/quality/ArmorQualityCard";
import ArmorModifierCard from "../../../../../equipment/armor/modifier/ArmorModifierCard";
import {useLocation} from "react-router-dom";

interface Props {
    open: boolean
    onCreateArmor: (armor: ActorArmor) => void
    onClose: () => void
}

export default function CreateArmorDialog(props: Props) {
    const {open, onCreateArmor, onClose} = props;
    const [armor, setArmor] = useState<ActorArmor>({
        slot: ArmorSlot.None,
        id: 'custom',
        modifiers: [],
        soak: 0,
        defense: 0,
        name: 'Default',
        price: 0,
        rarity: 0,
        restricted: false,
        encumbrance: 0,
        description: '',
        qualities: []
    });
    let pathname = useLocation().pathname;

    const onCreate = async (): Promise<void> => {
        onCreateArmor({...armor, slot: ArmorSlot.None} as ActorArmor)
        onClose()
    }

    const handleSoakChange = (value: number) => {
        setArmor({...armor, soak: value});
    };

    const handleDefenseChange = (value: number) => {
        setArmor({...armor, defense: value});
    };

    const handleNameChange = (value: string) => {
        setArmor({...armor, name: value});
    };

    const updateArmor = (updatedArmor: Armor) => {
        setArmor({...updatedArmor, slot: ArmorSlot.None});
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Custom Armor</DialogTitle>
            <DialogContent>
                <Grid container>
                    <TextField
                        value={armor.name}
                        variant="outlined"
                        fullWidth
                        label={'Name'}
                        onChange={e => handleNameChange(e.target.value)}
                    />
                </Grid>
                <Grid container>
                    <SoakCard armor={armor} updateSoak={handleSoakChange}/>
                    <DefenseCard armor={armor} updateDefense={handleDefenseChange}/>
                </Grid>
                <Grid container>
                    <ArmorQualityCard armor={armor} updateArmor={updateArmor} disabled={pathname.endsWith('/view')}/>
                    <ArmorModifierCard armor={armor} updateArmor={updateArmor} disabled={pathname.endsWith('/view')}/>
                </Grid>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    )
}