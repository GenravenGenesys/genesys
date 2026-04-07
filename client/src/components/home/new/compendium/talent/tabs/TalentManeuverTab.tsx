import * as React from 'react';
import {Card, CardContent, Stack, Typography} from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import GridContainer from '../../../../../common/grid/GridContainer.tsx';

const TalentManeuverTab: React.FC = () => {
    return (
        <Stack spacing={3}>
            <Card>
                <CardContent>
                    <GridContainer centered>
                        <DirectionsRunIcon sx={{fontSize: 48, color: 'primary.main', mb: 1}}/>
                    </GridContainer>
                    <Typography variant="subtitle2" sx={{textAlign: 'center', fontWeight: 'bold', color: 'primary.main', mb: 1}}>
                        Maneuver Configuration
                    </Typography>
                    <Typography variant="body2" sx={{textAlign: 'center', color: 'text.secondary'}}>
                        This talent can be used as a Maneuver. Maneuver-specific configuration options will appear here.
                    </Typography>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default TalentManeuverTab;
