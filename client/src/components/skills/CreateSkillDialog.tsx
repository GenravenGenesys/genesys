// import {Dialog, DialogContentText, TextField} from "@mui/material";
// import {type ChangeEvent, useState} from "react";
// import {useNavigate} from "react-router";
// import {RootPath} from "../../services/RootPath";
// import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
// import {getSkillController} from "../../api/generated/skill-controller/skill-controller.ts";
// import CenteredDialogTitle from "../common/dialog/CenteredDialogTitle.tsx";
//
// interface Props {
//     open: boolean
//     onClose: () => void
// }
//
// export default function CreateSkillDialog(props: Props) {
//     const {open, onClose} = props;
//     const [name, setName] = useState('');
//     const navigate = useNavigate();
//
//     const handleCreate = async (): Promise<void> => {
//         const skill = await getSkillController().createSkill(name);
//         navigate(RootPath.Skills + skill.id + '/view');
//         onClose();
//     };
//
//     const onNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
//         const {value} = event.target;
//         setName(value);
//     };
//
//     return (
//         <Dialog open={open} onClose={onClose}>
//             <CenteredDialogTitle title={"Create Skill"}/>
//             <DialogContentText>
//                 <TextField onChange={onNameChange} value={name} required/>
//             </DialogContentText>
//             <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
//         </Dialog>
//     )
// }
