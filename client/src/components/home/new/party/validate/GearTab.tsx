import {
    Accordion, AccordionDetails, AccordionSummary,
    Box, Chip, Divider, Grid, Stack, Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import type {ItemTemplate, PlayerEquipment} from "../../../../../api/model";
import {EquipmentType} from "../../../../../api/model";
import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography.tsx";

interface StatRowProps {
    label: string;
    value: string | number;
}

function StatRow({label, value}: StatRowProps) {
    return (
        <Box sx={{display: "flex", justifyContent: "space-between"}}>
            <Typography variant="body2" color="text.secondary">{label}</Typography>
            <Typography variant="body2" fontWeight="bold">{value}</Typography>
        </Box>
    );
}

interface ItemAccordionProps {
    item: ItemTemplate;
}

function ItemAccordion({item}: ItemAccordionProps) {
    return (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Box sx={{display: "flex", alignItems: "center", gap: 2, width: "100%"}}>
                    <Box sx={{flexGrow: 1}}>
                        <Typography variant="h6" sx={{textTransform: "capitalize"}}>
                            {item.name}
                            {item.amount > 1 && (
                                <Typography component="span" variant="body2" color="text.secondary" sx={{ml: 1}}>
                                    ×{item.amount}
                                </Typography>
                            )}
                        </Typography>
                    </Box>
                    <Chip label={item.type} size="small" variant="outlined" sx={{mr: 1}}/>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                <Stack spacing={1}>
                    {item.description && (
                        <Grid container spacing={2}>
                            <GenesysDescriptionTypography text={item.description}/>
                        </Grid>
                    )}

                    <Divider/>

                    <Grid container spacing={2}>
                        <Grid size={6}>
                            <StatRow label="Encumbrance" value={item.encumbrance}/>
                            <StatRow label="Price" value={item.price}/>
                            <StatRow label="Rarity" value={item.rarity}/>
                            <StatRow label="Restricted" value={item.restricted ? "Yes" : "No"}/>
                        </Grid>

                        {item.type === EquipmentType.Weapon && item.weaponStats && (
                            <Grid size={6}>
                                <StatRow label="Skill" value={item.weaponStats.skill?.name ?? "—"}/>
                                <StatRow label="Damage" value={item.weaponStats.brawn ? `+${item.weaponStats.damage} (Brawn)` : item.weaponStats.damage}/>
                                <StatRow label="Critical" value={item.weaponStats.critical}/>
                                <StatRow label="Range" value={item.weaponStats.range}/>
                            </Grid>
                        )}

                        {item.type === EquipmentType.Armor && item.armorStats && (
                            <Grid size={6}>
                                <StatRow label="Soak" value={item.armorStats.soak?.base ?? "—"}/>
                                <StatRow label="Defense" value={item.armorStats.defense?.base ?? "—"}/>
                            </Grid>
                        )}
                    </Grid>

                    {item.qualities && item.qualities.length > 0 && (
                        <>
                            <Divider/>
                            <Box>
                                <Typography variant="body2" color="text.secondary" gutterBottom>Qualities</Typography>
                                <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                                    {item.qualities.map((q, i) => (
                                        <Chip key={i} label={`${q.name} ${q.ranks}`} size="small"/>
                                    ))}
                                </Box>
                            </Box>
                        </>
                    )}
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}

interface Props {
    equipment: PlayerEquipment;
}

export default function GearTab({equipment}: Props) {
    const weapons = equipment?.weapons ?? [];
    const armor = equipment?.equippedArmor;
    const otherGear = equipment?.otherGear ?? [];

    return (
        <Stack spacing={3} sx={{mt: 2}}>
            <Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>
                    Weapons
                </Typography>
                {weapons.length === 0
                    ? <Typography variant="body2" color="text.secondary">No weapons equipped.</Typography>
                    : weapons.map((w, i) => <ItemAccordion key={i} item={w}/>)
                }
            </Box>

            <Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>
                    Armor
                </Typography>
                {!armor
                    ? <Typography variant="body2" color="text.secondary">No armor equipped.</Typography>
                    : <ItemAccordion item={armor}/>
                }
            </Box>

            <Box>
                <Typography variant="subtitle1" fontWeight="bold" sx={{mb: 1}}>
                    Other Gear
                </Typography>
                {otherGear.length === 0
                    ? <Typography variant="body2" color="text.secondary">No other gear.</Typography>
                    : otherGear.map((g, i) => <ItemAccordion key={i} item={g}/>)
                }
            </Box>
        </Stack>
    );
}


