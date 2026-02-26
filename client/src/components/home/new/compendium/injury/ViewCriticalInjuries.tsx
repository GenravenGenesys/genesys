import type {CriticalInjury} from "../../../../../api/model";
import {
    Box,
    Button,
    CircularProgress,
    InputAdornment,
    Paper, Table, TableBody,
    TableContainer,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell.tsx";
import CustomTableCell from "../../../../common/table/common/CustomTableCell.tsx";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {useCampaignLive} from "../../../../../hooks/campaign/useCampaginLive.ts";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders.tsx";
import {emptyCriticalInjury} from "../../../../../models/Template.ts";
import {useCreateCriticalInjury, useUpdateCriticalInjury} from "../../../../../api/generated/injuries/injuries.ts";

interface Props {
    injury: CriticalInjury;
    onEdit: (talent: CriticalInjury) => void;
}

function InjuryRow(props: Props) {
    const {injury, onEdit} = props;

    const onEditClick = () => {
        onEdit(injury);
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={injury.name}/>
            {/*{renderTalentNameTableCell(talent)}*/}
            {/*<TypographyCenterTableCell value={talent.type}/>*/}
            {/*<BooleanTableCell bool={talent.initiative}/>*/}
            <CustomTableCell centered>
                <Button variant="text" onClick={onEditClick}>
                    Edit
                </Button>
            </CustomTableCell>
        </TableRow>
    );
}

export default function ViewCompendiumInjuries() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [criticalInjury, setCriticalInjury] = useState<CriticalInjury>(emptyCriticalInjury);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Type", "Initiative", "Actions"];

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading} = useCampaignLive(id);
    const createCriticalInjury = useCreateCriticalInjury();
    const updateCriticalInjury = useUpdateCriticalInjury();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const filteredInjuries = campaign.compendium.criticalInjuries.filter((injury: CriticalInjury) =>
        injury.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setIsNew(true);
        setOpenDrawer(true);
    };

    const handleOpenEdit = (newInjury: CriticalInjury) => {
        setCriticalInjury(newInjury);
        setIsNew(false);
        setOpenDrawer(true);
    };

    const handleSave = async (updatedInjury: CriticalInjury) => {
        if (isNew) {
            await createCriticalInjury.mutateAsync({
                campaignId: campaign.id,
                data: updatedInjury
            });
        } else {
            await updateCriticalInjury.mutateAsync({
                campaignId: campaign.id,
                criticalInjuryId: updatedInjury.id,
                data: updatedInjury
            });
        }

        setCriticalInjury(emptyCriticalInjury);
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">
                    Critical Injury Compendium
                </Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>
                    New Critical Injury
                </Button>
            </Box>
            <Paper sx={{p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search critical injuries by name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    size="small"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            ),
                        }
                    }}
                />
            </Paper>
            <TableContainer component={Paper} sx={{borderRadius: 4}}>
                <Table aria-label="talent table">
                    {renderSingleRowTableHeader(headers, {bgcolor: 'rgba(255,255,255,0.05)'})}
                    <TableBody>
                        {filteredInjuries.map((injury) => (
                            <InjuryRow key={injury.id} injury={injury} onEdit={handleOpenEdit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/*<AdversaryDialog open={Boolean(openDrawer)} adversary={criticalInjury} onClose={() => setOpenDrawer(false)}*/}
            {/*                 onSave={handleSave} isNew={isNew}/>*/}
        </Box>
    );
}