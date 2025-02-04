import {SingleNonPlayerCharacter} from "../../../../models/actor/npc/NonPlayerActor";
import React from "react";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
import EditableBooleanTableCell from "../../../common/table/EditableBooleanTableCell";
import {ActorType} from "../../../../models/actor/Actor";

interface RowProps<T extends SingleNonPlayerCharacter> {
    npcs: SingleNonPlayerCharacter[];
    npc: SingleNonPlayerCharacter;
    onChange: (field: string, value: T[]) => void;
    value: boolean;
}

const NonPlayerCharacterEncounterTableRow = <T extends SingleNonPlayerCharacter, >({npcs, npc, onChange, value}: RowProps<T>) => {
    const updateNonPlayerCharacters = (value: boolean) => {
        let field = '';
            switch (npc.type) {
                case ActorType.Minion:
                    field = 'minions';
                    break;
                case ActorType.Rival:
                    field = 'rivals';
                    break;
                case ActorType.Nemesis:
                    field = 'nemeses';
                    break;
            }
            onChange(field, value ? [...npcs, npc] as T[] : npcs.filter(n => n.id === npc.id) as T[]);
    };

    return (
        <TableRow key={npc.id}>
            <TypographyCenterTableCell value={npc.name}/>
            <EditableBooleanTableCell disabled={false} onChange={updateNonPlayerCharacters}
                                      bool={value}/>
        </TableRow>
    );
};


interface Props<T extends SingleNonPlayerCharacter> {
    npcs: SingleNonPlayerCharacter[];
    onChange: (field: string, value: T[]) => void;
}

const NonPlayerCharacterEncounterTable = <T extends SingleNonPlayerCharacter, >({npcs, onChange}: Props<T>) => {
    let headers = ['Name', 'Active'];

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderSingleRowTableHeader(headers)}
                <TableBody>
                    {npcs.map((npc: SingleNonPlayerCharacter) => (
                        <NonPlayerCharacterEncounterTableRow npcs={npcs} npc={npc} onChange={onChange} value={npcs.includes(npc)}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default NonPlayerCharacterEncounterTable;