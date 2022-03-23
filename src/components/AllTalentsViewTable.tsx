import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Talent from '../models/Talent';
import TalentService from '../services/TalentService';
import { Fragment, useEffect, useState } from 'react';

function TalentRow(props: { row: Talent }) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} onClick={() => setOpen(!open)}>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell>{row.ranked.toString()}</TableCell>
                <TableCell>{row.activation}</TableCell>
                <TableCell>{row.tier}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table size="small" aria-label="purchases">
                                <TableBody>
                                    {row.description}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </Fragment>
    );
}

export default function AllTalentsView() {
    const [talents, setTalents] = useState<Talent[]>([]);

    useEffect(() => {
        (async (): Promise<void> => {
            const talentList = await TalentService.getTalents();
            if (!talentList) { return; }
            setTalents(talentList);
        })();
    });

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Talent Name</TableCell>
                        <TableCell>Ranked</TableCell>
                        <TableCell>Activation</TableCell>
                        <TableCell>Tier</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {talents.map((row: Talent) => (
                        <TalentRow key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
