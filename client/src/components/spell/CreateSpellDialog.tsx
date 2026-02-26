// import {type ChangeEvent, useState} from "react";
// import {useNavigate} from "react-router";
// import {Dialog, DialogContentText, TextField} from "@mui/material";
// import GenesysDialogActions from "../common/dialog/GenesysDialogActions";
// import { RootPath } from "../../services/RootPath";
// import CenteredDialogTitle from "../common/dialog/CenteredDialogTitle.tsx";
// import {getSpellController} from "../../api/generated/spell-controller/spell-controller.ts";
//
// interface Props {
//     open: boolean;
//     onClose: () => void;
// }
//
// export default function CreateSpellDialog(props: Props) {
//     const {open, onClose} = props;
//     const [name, setName] = useState('');
//     const navigate = useNavigate();
//
//     const handleCreate = async (): Promise<void> => {
//         const spell = await getSpellController().createSpell(name);
//         navigate(RootPath.Spell + spell.id + '/view');
//         onClose();
//     }
//
//     const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
//         const {value} = event.target;
//         setName(value);
//     };
//
//     return (
//         <Dialog open={open} onClose={onClose}>
//             <CenteredDialogTitle title={"Create Spell"}/>
//             <DialogContentText>
//                 <TextField onChange={onChange} value={name} required/>
//             </DialogContentText>
//             <GenesysDialogActions handleCreate={handleCreate} onClose={onClose}/>
//         </Dialog>
//     );
// }