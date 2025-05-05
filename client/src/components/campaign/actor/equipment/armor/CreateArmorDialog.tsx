import {Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import GenesysDialogActions from "../../../../common/dialog/GenesysDialogActions";
import {ActorArmor, Armor, ArmorSlot} from "../../../../../models/equipment/Armor";
import SoakCard from "../../../../common/card/SoakCard";
import DefenseCard from "../../../../common/card/DefenseCard";
import {useLocation} from "react-router";
import ArmorQualityCard from "../../../equipment/armor/quality/ArmorQualityCard";
import ArmorModifierCard from "../../../equipment/armor/modifier/ArmorModifierCard";
import GridContainer from "../../../../common/grid/GridContainer";

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

    const onCreate = () => {
        onCreateArmor({...armor, slot: ArmorSlot.None} as ActorArmor);
        onClose();
    };

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
    };

    return (
        <Dialog open={open} onClose={onClose} fullScreen>
            <DialogTitle>Add Custom Armor</DialogTitle>
            <DialogContent>
                <GridContainer>
                    <TextField
                        value={armor.name}
                        variant="outlined"
                        fullWidth
                        label={'Name'}
                        onChange={e => handleNameChange(e.target.value)}
                    />
                </GridContainer>
                <GridContainer>
                    <SoakCard armor={armor} updateSoak={handleSoakChange}/>
                    <DefenseCard armor={armor} updateDefense={handleDefenseChange}/>
                </GridContainer>
                <GridContainer>
                    <ArmorQualityCard armor={armor} updateArmor={updateArmor} disabled={pathname.endsWith('/view')}/>
                    <ArmorModifierCard armor={armor} updateArmor={updateArmor} disabled={pathname.endsWith('/view')}/>
                </GridContainer>
            </DialogContent>
            <GenesysDialogActions handleCreate={onCreate} onClose={onClose}/>
        </Dialog>
    )
}