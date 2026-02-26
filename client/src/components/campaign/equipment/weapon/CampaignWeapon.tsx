// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import {Fragment, useState} from 'react';
// import {TypographyCenterTableCell} from "../../../common/table/TypographyTableCell";
// import {renderDamage, renderPrice} from '../../../../util/EquipmentHelper.ts';
// import {renderSkillName} from "../../../common/skill/SkillRenders";
// import ActionsTableCell from "../../../common/table/actions/ActionsTableCell";
// import {EquipmentPath} from "../../../../services/RootPath";
// import GenesysDescriptionTypography from "../../../common/typography/GenesysDescriptionTypography";
// import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
// import {renderSingleRowTableHeader} from "../../../common/table/TableRenders";
// import CreateEquipmentDialog from "../CreateEquipmentDialog";
// import {useFetchAllWeapons} from "../../../../hooks/useFetchAllWeapons.ts";
// import {EquipmentType, type Weapon} from "../../../../api/model";
// import CenteredCardHeaderWithButton from "../../../common/card/header/CenteredCardHeaderWithButton.tsx";
//
// interface Props {
//     weapon: Weapon
//     columns: number
// }
//
// function Row(props: Props) {
//     const {weapon, columns} = props
//     const [open, setOpen] = useState(false)
//
//     return (
//         <Fragment>
//             <TableRow onClick={() => setOpen(!open)}>
//                 <TypographyCenterTableCell value={weapon.name}/>
//                 <TypographyCenterTableCell value={renderSkillName(weapon.skill)}/>
//                 <TypographyCenterTableCell value={renderDamage(weapon)}/>
//                 <TypographyCenterTableCell value={String(weapon.critical)}/>
//                 <TypographyCenterTableCell value={weapon.range}/>
//                 <TypographyCenterTableCell value={String(weapon.encumbrance)}/>
//                 <TypographyCenterTableCell value={renderPrice(weapon)}/>
//                 <TypographyCenterTableCell value={String(weapon.rarity)}/>
//                 <ActionsTableCell name={weapon.id} path={EquipmentPath.Weapon}/>
//             </TableRow>
//             <TableRow>
//                 <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={columns}>
//                     <Collapse in={open} timeout="auto" unmountOnExit>
//                         <Box sx={{margin: 1}}>
//                             <Table size="small">
//                                 <TableBody>
//                                     <GenesysDescriptionTypography text={weapon.description}/>
//                                 </TableBody>
//                             </Table>
//                         </Box>
//                     </Collapse>
//                 </TableCell>
//             </TableRow>
//         </Fragment>
//     )
// }
//
// export default function CampaignWeapon() {
//     const [openEquipmentCreationDialog, setOpenEquipmentCreationDialog] = useState(false);
//     const headers = ['Name', 'Skill', 'Damage', 'Critical', 'Range', 'Encumbrance', 'Price', 'Rarity', 'View'];
//     const {weapons, loading, error} = useFetchAllWeapons();
//
//     if (loading) {
//         return <CircularProgress/>;
//     }
//
//     if (error) {
//         return (
//             <Alert severity="error">
//                 {error}
//             </Alert>
//         );
//     }
//
//     return (
//         <Card>
//             <CenteredCardHeaderWithButton title={'Campaign Weapons'}
//                                           onClick={(): void => setOpenEquipmentCreationDialog(true)}
//                                           buttonText={'Create Weapon'}/>
//             <CardContent>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         {renderSingleRowTableHeader(headers)}
//                         <TableBody>
//                             {weapons.map((weapon: Weapon) => (
//                                 <Row key={weapon.name} weapon={weapon} columns={headers.length}/>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </CardContent>
//             {openEquipmentCreationDialog && <CreateEquipmentDialog open={openEquipmentCreationDialog}
//                                                                    onClose={(): void => setOpenEquipmentCreationDialog(false)}
//                                                                    type={EquipmentType.Weapon}/>}
//         </Card>
//     )
// }
