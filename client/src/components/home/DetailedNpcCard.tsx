import {Box, Typography, Card, CardContent, Grid2 as Grid, Divider, Stack, Avatar, Button} from '@mui/material';

const StatBox = ({label, value, color}) => (
    <Box sx={{textAlign: 'center', flex: 1, bgcolor: `${color}11`, p: 1, borderRadius: 1}}>
        <Typography variant="caption" sx={{color: color, fontWeight: 'bold', display: 'block'}}>{label}</Typography>
        <Typography variant="h6" sx={{color: color, lineHeight: 1}}>{value}</Typography>
    </Box>
);

const CharCircle = ({ label, value }) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 45 }}>
        <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 800, mb: 0.5, color: 'text.secondary' }}>
            {label}
        </Typography>
        <Avatar
            variant="circular" // Explicitly set variant to avoid icon fallback
            sx={{
                width: 34,
                height: 34,
                bgcolor: 'primary.main', // Using primary color for the circle background
                color: 'background.default', // Using dark background color for the text (high contrast)
                fontSize: '1rem',
                fontWeight: 900,
                border: '1px solid rgba(255,255,255,0.1)'
            }}
        >
            {String(value)} {/* Explicitly cast to string to ensure rendering */}
        </Avatar>
    </Box>
);

export default function DetailedNpcCard({npc, onEdit}) {
    return (
        <Card sx={{border: '1px solid rgba(255,255,255,0.1)', overflow: 'visible'}}>
            {/* 1. POWER RATINGS BAR */}
            <Stack direction="row" spacing={0.5} sx={{p: 1, bgcolor: 'rgba(0,0,0,0.3)'}}>
                <StatBox label="COMBAT" value={npc.ratings.combat} color="#f44336"/>
                <StatBox label="SOCIAL" value={npc.ratings.social} color="#2196f3"/>
                <StatBox label="GENERAL" value={npc.ratings.general} color="#4caf50"/>
            </Stack>

            <CardContent sx={{pt: 2}}>
                <Typography variant="h6" fontWeight="bold" sx={{mb: 2}}>{npc.name}</Typography>

                {/* 2. CHARACTERISTICS ROW */}
                <Stack direction="row" justifyContent="space-between" sx={{mb: 3, px: 1}}>
                    <CharCircle label="BR" value={npc.characteristics.BR}/>
                    <CharCircle label="AG" value={npc.characteristics.AG}/>
                    <CharCircle label="INT" value={npc.characteristics.INT}/>
                    <CharCircle label="CUN" value={npc.characteristics.CUN}/>
                    <CharCircle label="WIL" value={npc.characteristics.WIL}/>
                    <CharCircle label="PR" value={npc.characteristics.PR}/>
                </Stack>

                <Divider sx={{my: 2, opacity: 0.1}}/>

                {/* 3. DERIVED STATS GRID */}
                <Grid container spacing={1}>
                    <Grid size={4}>
                        <Typography variant="caption" color="text.secondary">SOAK</Typography>
                        <Typography variant="body1" fontWeight="bold">{npc.derived.soak}</Typography>
                    </Grid>
                    <Grid size={4}>
                        <Typography variant="caption" color="text.secondary">WOUNDS</Typography>
                        <Typography variant="body1" fontWeight="bold"
                                    color="error.main">{npc.derived.wounds}</Typography>
                    </Grid>
                    <Grid size={4}>
                        <Typography variant="caption" color="text.secondary">STRAIN</Typography>
                        <Typography variant="body1" fontWeight="bold"
                                    color="info.main">{npc.derived.strain || '-'}</Typography>
                    </Grid>
                </Grid>
                <Box sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button size="small" variant="outlined" onClick={onEdit}>
                        Edit Stats
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}