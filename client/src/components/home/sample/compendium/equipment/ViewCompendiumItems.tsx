import type {
    ItemTemplate,
} from "../../../../../api/model";
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
    Typography,
    Chip
} from "@mui/material";
import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell.tsx";
import CustomTableCell from "../../../../common/table/common/CustomTableCell.tsx";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {useCampaignLive} from "../../../../../hooks/campaign/useCampaginLive.ts";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders.tsx";
import {
    useCreateItem,
    useUpdateItem
} from "../../../../../api/generated/item-compendium/item-compendium.ts";
import {emptyItemTemplate} from "../../../../../models/Template.ts";
import ItemDialog from "./ItemDialog.tsx";

interface Props {
    item: ItemTemplate;
    onEdit: (item: ItemTemplate) => void;
}

function ItemRow(props: Props) {
    const {item, onEdit} = props;

    const onEditClick = () => {
        onEdit(item);
    }

    return (
        <TableRow>
            <TypographyCenterTableCell value={item.name}/>
            <CustomTableCell centered>
                <Chip label={item.type} size="small" color="primary" variant="outlined"/>
            </CustomTableCell>
            <TypographyCenterTableCell value={String(item.price)}/>
            <TypographyCenterTableCell value={String(item.encumbrance)}/>
            <TypographyCenterTableCell value={String(item.rarity)}/>
            <CustomTableCell centered>
                <Button variant="text" onClick={onEditClick}>
                    Edit
                </Button>
            </CustomTableCell>
        </TableRow>
    );
}

export default function ViewCompendiumItems() {
    const {id} = useParams<{ id: string }>();
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [item, setItem] = useState<ItemTemplate>(emptyItemTemplate);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Type", "Price", "Encumbrance", "Rarity", "Actions"];

    if (!id) {
        return <Typography variant="h6" color="error">No Campaign ID Provided</Typography>;
    }

    const {campaign, isLoading} = useCampaignLive(id);
    const createItem = useCreateItem();
    const updateItem = useUpdateItem();

    if (isLoading) {
        return <CircularProgress/>;
    }

    if (!campaign) {
        return <Typography variant="h6" color="error">Campaign Not Found</Typography>;
    }

    const filteredItems = campaign.compendium.items.filter((item: ItemTemplate) =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setItem(emptyItemTemplate);
        setIsNew(true);
        setOpenDrawer(true);
    };

    const handleOpenEdit = (newItem: ItemTemplate) => {
        setItem(newItem);
        setIsNew(false);
        setOpenDrawer(true);
    };

    const handleSave = async (updatedItem: ItemTemplate) => {
        console.log("Saving item:", updatedItem);
        if (isNew) {
            await createItem.mutateAsync({
                campaignId: campaign.id,
                data: updatedItem
            });
        } else {
            await updateItem.mutateAsync({
                campaignId: campaign.id,
                itemId: updatedItem.id,
                data: updatedItem
            });
        }

        setItem(emptyItemTemplate);
    };

    return (
        <Box sx={{p: 4, maxWidth: 1200, mx: 'auto'}}>
            <Box sx={{display: 'flex', justifyContent: 'space-between', mb: 4}}>
                <Typography variant="h4" fontWeight="900">
                    Equipment Compendium
                </Typography>
                <Button variant="contained" startIcon={<AddIcon/>} onClick={handleOpenCreate}>
                    New Item
                </Button>
            </Box>
            <Paper sx={{p: 2, mb: 3, display: 'flex', gap: 2, alignItems: 'center'}}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search equipment by name..."
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
                <Table aria-label="item table">
                    {renderSingleRowTableHeader(headers, {bgcolor: 'rgba(255,255,255,0.05)'})}
                    <TableBody>
                        {filteredItems.map((item) => (
                            <ItemRow key={item.id} item={item} onEdit={handleOpenEdit}/>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <ItemDialog
                open={Boolean(openDrawer)}
                item={item}
                onClose={() => setOpenDrawer(false)}
                onSave={handleSave}
                isNew={isNew}
            />
        </Box>
    );
}
