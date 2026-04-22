import type {Spell} from "../../../../../api/model";
import {
    Box,
    Button,
    CircularProgress,
    InputAdornment,
    Paper,
    Table,
    TableBody,
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
import {emptySpell} from "../../../../../models/Template.ts";
import {useCreateSpell, useUpdateSpell} from "../../../../../api/generated/spells/spells.ts";
import SpellDialog from "./SpellDialog.tsx";

interface Props {
    spell: Spell;
    onEdit: (spell: Spell) => void;
}

function SpellRow(props: Props) {
    const {spell, onEdit} = props;

    const onEditClick = () => {
        onEdit(spell);
    };

    return (
        <TableRow>
            <TypographyCenterTableCell value={spell.name}/>
            <TypographyCenterTableCell value={spell.difficulty}/>
            <TypographyCenterTableCell value={spell.range}/>
            <TypographyCenterTableCell value={spell.concentration ? "Yes" : "No"}/>
            <TypographyCenterTableCell value={String(spell.effects.length)}/>
            <CustomTableCell centered>
                <Button variant="text" onClick={onEditClick}>
                    Edit
                </Button>
            </CustomTableCell>
        </TableRow>
    );
}

export default function ViewCompendiumSpells() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [currentSpell, setCurrentSpell] = useState<Spell>(emptySpell);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Difficulty", "Range", "Concentration", "Effects", "Actions"];

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading} = useCampaignLive(id);
    const createSpell = useCreateSpell();
    const updateSpell = useUpdateSpell();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const filteredSpells = campaign.compendium.spells.filter((spell: Spell) =>
        spell.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setCurrentSpell(emptySpell);
        setIsNew(true);
        setOpenDialog(true);
    };

    const handleOpenEdit = (spell: Spell) => {
        setCurrentSpell(spell);
        setIsNew(false);
        setOpenDialog(true);
    };

    const handleSave = async (updatedSpell: Spell) => {
        if (isNew) {
            await createSpell.mutateAsync({
                campaignId: campaign.id,
                data: updatedSpell
            });
        } else {
            await updateSpell.mutateAsync({
                campaignId: campaign.id,
                spellId: updatedSpell.id,
                data: updatedSpell
            });
        }
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">
                    Spell Compendium
                </Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>
                    New Spell
                </Button>
            </Box>
            <Paper sx={{p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search spells by name..."
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
                <Table aria-label="spell table">
                    {renderSingleRowTableHeader(headers, {bgcolor: 'rgba(255,255,255,0.05)'})}
                    <TableBody>
                        {filteredSpells.map((spell) => (
                            <SpellRow key={spell.id} spell={spell} onEdit={handleOpenEdit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <SpellDialog
                open={openDialog}
                spell={currentSpell}
                campaignSkills={campaign.compendium.skills}
                onClose={() => setOpenDialog(false)}
                onSave={handleSave}
                isNew={isNew}
            />
        </Box>
    );
}
