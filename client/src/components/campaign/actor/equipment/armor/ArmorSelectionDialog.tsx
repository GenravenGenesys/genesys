// import {Button, Card, CardContent, Dialog, DialogActions, DialogContent} from "@mui/material";
// import CenteredCardHeader from "../../../../common/card/header/CenteredCardHeader";
// import TableContainer from "@mui/material/TableContainer";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import {renderSingleRowTableHeader} from "../../../../common/table/TableRenders";
// import TableBody from "@mui/material/TableBody";
// import TableRow from "@mui/material/TableRow";
// import {TypographyCenterTableCell} from "../../../../common/table/TypographyTableCell";
// import {renderPrice, renderQualities, renderSoak} from "../../../../../util/EquipmentHelper.ts";
// import TableCell from "@mui/material/TableCell";
// import type {Armor} from "../../../../../api/model";
// import {useFetchAllArmor} from "../../../../../hooks/useFetchAllArmor.ts";
//
// interface Props {
//     open: boolean
//     addArmor: (armor: Armor) => void
//     onClose: () => void
// }
//
// export default function ArmorSelectionDialog(props: Props) {
//     const {open, addArmor, onClose} = props;
//     const headers = ['Name', 'Defense', 'Soak', 'Encumbrance', 'Price', 'Rarity', 'Special Qualities', 'Add'];
//     const {armors} = useFetchAllArmor();
//
//     return (
//         <Dialog open={open} onClose={onClose} fullScreen>
//             <DialogContent>
//                 <Card>
//                     <CenteredCardHeader title={'Armors'}/>
//                     <CardContent>
//                         <TableContainer component={Paper}>
//                             <Table>
//                                 {renderSingleRowTableHeader(headers)}
//                                 <TableBody>
//                                     {armors.map((armor: Armor) => (
//                                         <TableRow key={armor.name}>
//                                             <TypographyCenterTableCell value={armor.name}/>
//                                             <TypographyCenterTableCell value={String(armor.defense)}/>
//                                             <TypographyCenterTableCell value={renderSoak(armor)}/>
//                                             <TypographyCenterTableCell value={String(armor.encumbrance)}/>
//                                             <TypographyCenterTableCell value={renderPrice(armor)}/>
//                                             <TypographyCenterTableCell value={String(armor.rarity)}/>
//                                             <TypographyCenterTableCell value={renderQualities(armor)}/>
//                                             <TableCell style={{textAlign: "center"}}>
//                                                 <Button onClick={() => addArmor(armor)}>Add</Button>
//                                             </TableCell>
//                                         </TableRow>
//                                     ))}
//                                 </TableBody>
//                             </Table>
//                         </TableContainer>
//                     </CardContent>
//                 </Card>
//             </DialogContent>
//             <DialogActions>
//                 <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
//             </DialogActions>
//         </Dialog>
//     );
// }