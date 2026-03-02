import {useState} from "react";
import {
    getCampaignTalentController
} from "../../../api/generated/campaign-talent-controller/campaign-talent-controller.ts";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import {Button} from "@mui/material";
import TalentBackdrop from "../../talents/TalentBackdrop.tsx";
import type {Talent} from "../../../api/model";

interface RowProps {
    talent: Talent
}

export default function TalentRow(props: RowProps) {
    const {talent} = props;
    const [openTalentBackDrop, setOpenTalentBackDrop] = useState(false);

    const addTalent = async () => {
        await getCampaignTalentController().addTalentToCurrentCampaign(talent.id);
    };

    return (
        <TableRow key={talent.name}>
            <TableCell>
                <Button onClick={(): void => setOpenTalentBackDrop(true)}>{talent.name}</Button>
                {openTalentBackDrop &&
                    <TalentBackdrop open={openTalentBackDrop} onClose={(): void => setOpenTalentBackDrop(false)}
                                    talent={talent}/>}
            </TableCell>
            <TableCell>
                <Button onClick={addTalent}>Add</Button>
            </TableCell>
        </TableRow>
    );
}