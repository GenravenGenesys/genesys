// import TableContainer from "@mui/material/TableContainer";
// import Paper from "@mui/material/Paper";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import {renderSingleRowTableHeader} from "../../common/table/TableRenders";
// import {useFetchAllSkills} from "../../../hooks/useFetchAllSkills.ts";
// import type {Skill} from "../../../api/model";
// import SkillRow from "./SkillRow.tsx";
//
// export default function CampaignSkillSelectionTable() {
//     const {skills} = useFetchAllSkills();
//     const headers = ['Name', 'Add'];
//
//     return (
//         <TableContainer component={Paper}>
//             <Table>
//                 {renderSingleRowTableHeader(headers)}
//                 <TableBody>
//                     {skills.sort((a, b) => a.name.localeCompare(b.name)).map((skill: Skill) => (
//                         <SkillRow skill={skill}/>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }