// import TableContainer from "@mui/material/TableContainer";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import {Alert, CircularProgress} from "@mui/material";
// import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
// import TalentRow from "./TalentRow.tsx";
// import {useFetchAllTalents} from "../../../hooks/useFetchAllTalents.ts";
// import type {Talent} from "../../../api/model";
//
// export default function CampaignTalentSelectionTable() {
//     const headers = ['Name', 'Add'];
//     const {talents, loading, error} = useFetchAllTalents();
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
//         <TableContainer component={Paper}>
//             <Table>
//                 {renderSingleRowTableHeader(headers)}
//                 <TableBody>
//                     {talents.map((talent: Talent) => (
//                         <TalentRow talent={talent}/>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }