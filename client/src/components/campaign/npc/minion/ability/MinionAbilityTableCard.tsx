import { FC, Fragment, useState } from "react";
import Ability from "../../../../../models/Ability";
import { useLocation } from "react-router";
import { Button, Card, CardContent, Paper, Table, TableBody, TableContainer, TableFooter, TableRow } from "@mui/material";
import { GenesysDescriptionTypographyCenterTableCell, TypographyCenterTableCell, TypographyLeftTableCell } from "../../../../common/table/TypographyTableCell";
import CreateAbilityDialog from "../../../actor/ability/CreateAbilityDialog";
import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
import { renderSingleRowTableHeader } from "../../../../common/table/TableRenders";
import Minion from "../../../../../models/actor/npc/Minion";


type Props = {
    minion: Minion;
    abilities: Ability[];
    updateAbilities: (abilities: Ability[]) => void;
};

const MinionAbilityTableCard: FC<Props> = ({ abilities, updateAbilities }) => {
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false);
    const pathname = useLocation().pathname;
    const headers = ['Name', 'Activation', 'Summary'];

    const createAbility = (ability: Ability) => {
        updateAbilities([...abilities, ability]);
    };

    const renderTableBody = () => {
        return (
            <TableBody>
                {(abilities).map((ability: Ability) => (
                    <TableRow key={ability.name}>
                        <TypographyLeftTableCell value={ability.name} />
                        <TypographyCenterTableCell value={ability.activation} />
                        <GenesysDescriptionTypographyCenterTableCell value={ability.description} />
                    </TableRow>
                ))}
            </TableBody>
        )
    };

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow key={'Footer'}>
                        <Button color='primary' variant='contained'
                            onClick={(): void => setOpenCreateAbilityDialog(true)}>Create
                            Ability</Button>
                        {openCreateAbilityDialog &&
                            <CreateAbilityDialog open={openCreateAbilityDialog}
                                onClose={(): void => setOpenCreateAbilityDialog(false)}
                                onCreateAbility={createAbility} />}
                    </TableRow>
                </TableFooter>
            )
        } else {
            return <Fragment />
        }
    };

    return (
        <Card sx={{ width: 1 }}>
            <CenteredCardHeader title={'Abilities'} />
            <CardContent>
                <TableContainer component={Paper}>
                    <Table>
                        {renderSingleRowTableHeader(headers)}
                        {renderTableBody()}
                        {renderTableFooter()}
                    </Table>
                </TableContainer>
            </CardContent>
        </Card>
    )
};

export default MinionAbilityTableCard;