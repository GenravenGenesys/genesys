import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { renderSingleRowTableHeader } from "../../../common/table/TableRenders";
import { Button, Card, CardContent, TableCell, TableFooter } from "@mui/material";
import TableRow from "@mui/material/TableRow";
import { FC, Fragment, useState } from "react";
import { useLocation } from "react-router";
import CreateAbilityDialog from "./CreateAbilityDialog";
import Ability from "../../../../models/Ability";
import TableBody from "@mui/material/TableBody";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import { SingleNonPlayerCharacter } from "../../../../models/actor/npc/NonPlayerActor";
import AbilityTableRow from "./AbilityTableRow";

type Props = {
    abilities: Ability[];
    npc: SingleNonPlayerCharacter;
    updateAbilities: (abilities: Ability[]) => void;
};

const AbilityTableCard: FC<Props> = ({ abilities, npc, updateAbilities }) => {
    const [openCreateAbilityDialog, setOpenCreateAbilityDialog] = useState(false);
    const [openRows, setOpenRows] = useState<Record<string, boolean>>({});
    const pathname = useLocation().pathname;
    const headers = ['Name', 'Activation', 'Summary'];

    const createAbility = (ability: Ability) => {
        updateAbilities([...abilities, ability]);
    };

    const handleToggle = (id: string) => {
        setOpenRows((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };


    const renderTableBody = () => {
        return (
            <TableBody>
                {abilities.map((ability) => (
                    <AbilityTableRow
                        key={ability.name}
                        npc={npc}
                        ability={ability}
                        columns={headers.length}
                        isOpen={openRows[ability.name] || false}
                        onToggle={() => handleToggle(ability.name)}
                    />
                ))}
            </TableBody>

        )
    };

    const renderTableFooter = () => {
        if (pathname.endsWith('/edit')) {
            return (
                <TableFooter>
                    <TableRow key="Footer">
                        <TableCell>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={() => setOpenCreateAbilityDialog(true)}
                            >
                                Create Ability
                            </Button>

                            {openCreateAbilityDialog && (
                                <CreateAbilityDialog
                                    open={openCreateAbilityDialog}
                                    onClose={() => setOpenCreateAbilityDialog(false)}
                                    onCreateAbility={createAbility}
                                    npc={npc}
                                />
                            )}
                        </TableCell>
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

export default AbilityTableCard;