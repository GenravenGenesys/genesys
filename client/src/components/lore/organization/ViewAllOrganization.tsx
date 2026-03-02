// import * as React from "react";
// import {useState} from "react";
// import TableRow from "@mui/material/TableRow";
// import TableContainer from "@mui/material/TableContainer";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import ActionsTableCell from "../../common/table/actions/ActionsTableCell";
// import {GenesysDescriptionTypographyCenterTableCell} from "../../common/table/TypographyTableCell";
// import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
// import {Alert, Card, CardContent, CircularProgress} from "@mui/material";
// import LoreCreationDialog from "../common/LoreCreationDialog";
// import {LoreType} from "../../../models/lore/Lore";
// import {LorePath} from "../../../services/RootPath";
// import CenteredCardHeaderWithButton from "../../common/card/header/CenteredCardHeaderWithButton";
// import {useFetchAllOrganizations} from "../../../hooks/useFetchAllOrganizations.ts";
// import type {Organization} from "../../../api/model";
//
// const ViewAllOrganizations: React.FC = () => {
//     const [openLoreCreationDialog, setOpenLoreCreationDialog] = useState(false);
//     const headers = ['Name', 'View'];
//     const {organizations, loading, error} = useFetchAllOrganizations();
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
//             <CenteredCardHeaderWithButton title={'View All Organizations'}
//                                           onClick={() => setOpenLoreCreationDialog(true)}
//                                           buttonText={'Create Organization'}/>
//             {openLoreCreationDialog &&
//                 <LoreCreationDialog open={openLoreCreationDialog} onClose={(): void => setOpenLoreCreationDialog(false)}
//                                     lore={LoreType.ORGANIZATION} path={LorePath.Organization}/>}
//             <CardContent>
//                 <TableContainer component={Paper}>
//                     <Table>
//                         {renderSingleRowTableHeader(headers)}
//                         <TableBody>
//                             {organizations.map((organization: Organization) => (
//                                 <TableRow key={organization.id}>
//                                     <GenesysDescriptionTypographyCenterTableCell value={organization.name}/>
//                                     <ActionsTableCell name={organization.id} path={LorePath.Organization}/>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </CardContent>
//         </Card>
//     );
// };
//
// export default ViewAllOrganizations;