import {Dialog, DialogContent, DialogTitle, TextField} from "@mui/material";
import {useState} from "react";
import GenesysDialogActions from "../../../../common/dialog/GenesysDialogActions";
import SoakCard from "../../../../common/card/SoakCard";
import DefenseCard from "../../../../common/card/DefenseCard";
import {useLocation} from "react-router";
import ArmorQualityCard from "../../../equipment/armor/quality/ArmorQualityCard";
import ArmorModifierCard from "../../../equipment/armor/modifier/ArmorModifierCard";
import GridContainer from "../../../../common/grid/GridContainer";
import {type ActorArmor, ActorArmorSlot, type Armor} from "../../../../../api/model";

interface Props {
    open: boolean
    onCreateArmor: (armor: ActorArmor) => void
    onClose: () => void
}

export default function CreateArmorDialog(props: Props) {
    const {open, onCreateArmor, onClose} = props;
    const [armor, setArmor] = useState<ActorArmor>({
        slot: ActorArmorSlot.None,
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
    const pathname = useLocation().pathname;

    const onCreate = () => {
        onCreateArmor({...armor, slot: ActorArmorSlot.None} as ActorArmor);
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
        setArmor({...updatedArmor, slot: ActorArmorSlot.None});
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