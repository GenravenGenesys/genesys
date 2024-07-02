import {Button, Card, CardContent} from "@mui/material";
import * as React from "react";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import {Armor} from "../../../models/equipment/Armor";
import ArmorQualityTable from "./ArmorQualityTable";
import ArmorQualitySelectionDialog from "./ArmorQualitySelectionDialog";
import CenteredCardHeader from "../../common/card/CenteredCardHeader";

interface Props {
    armor: Armor
}

export default function ArmorQualityCard(props: Props) {
    const {armor} = props
    const [openAddArmorQualityDialog, setOpenAddArmorQualityDialog] = useState(false)

    const renderTable = () => {
        if (armor.qualities.length === 0) {
            return <Typography style={{textAlign: 'center'}}>None</Typography>
        }
        return <ArmorQualityTable armor={armor}/>
    }

    return (
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title={'Armor Special Qualities'}/>
            <CardContent>
                {renderTable()}
                <Button color='primary' variant='contained' onClick={(): void => setOpenAddArmorQualityDialog(true)}>Add
                    Special Quality</Button>
                {openAddArmorQualityDialog &&
                    <ArmorQualitySelectionDialog armor={armor} open={openAddArmorQualityDialog}
                                                  onClose={(): void => setOpenAddArmorQualityDialog(false)}/>}
            </CardContent>
        </Card>
    )
}