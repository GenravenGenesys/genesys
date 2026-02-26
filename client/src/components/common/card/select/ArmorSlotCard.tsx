import {Card, CardContent} from "@mui/material";
import * as React from "react";
import CenteredCardHeader from "../header/CenteredCardHeader";
import ViewFieldCard from "../../ViewFieldCard";
import GridItem from "../../grid/GridItem";
import GenesysSelectField from "../../../home/common/field/GenesysSelectField";
import {ActorArmorSlot} from "../../../../api/model";

interface Props {
    value: ActorArmorSlot;
    onChange: (value: ActorArmorSlot) => void;
    disabled: boolean;
}

const ArmorSlotCard: React.FC<Props> = ({value, onChange, disabled}) => {
    return disabled ? <ViewFieldCard name={'Armor Slot'} value={value}/> :
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Armor Slot'}/>
                <CardContent>
                    <GenesysSelectField value={value} label={'Armor Slot'} onChange={onChange} options={ActorArmorSlot}
                                        disabled={disabled}/>
                </CardContent>
            </Card>
        </GridItem>;
};

export default ArmorSlotCard;