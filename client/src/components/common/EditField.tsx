import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";
import { ReactNode } from "react";
import GridItem from "./grid/GridItem";

interface Props {
    edit: boolean;
    editable?: boolean;
    viewElement: ReactNode | null;
    editElement: ReactNode | null;
    onEdit: () => void;
    onCancel: () => void;
    onCommit: () => void;
}

const EditField = ({
    edit,
    editable = true,
    viewElement,
    editElement,
    onEdit,
    onCancel,
    onCommit
}: Props) => {
    const editButton = (
        <IconButton title="Edit" size="small" onClick={onEdit}>
            <EditIcon color="primary" fontSize="small" />
        </IconButton>
    );

    const commitButton = (
        <Box display="flex" gap={0.5}>
            <IconButton title="Commit" size="small" onClick={onCommit}>
                <CheckIcon color="primary" fontSize="small" />
            </IconButton>
            <IconButton title="Cancel" size="small" onClick={onCancel}>
                <CancelIcon color="primary" fontSize="small" />
            </IconButton>
        </Box>
    );

    if (!editable) {
        return <GridItem>{viewElement}</GridItem>;
    };

    return (
        <GridItem>
            <Box display="flex" alignItems="center" width="100%" gap={1}>
                <Box flexGrow={1}>{edit ? editElement : viewElement}</Box>
                {edit ? commitButton : editButton}
            </Box>
        </GridItem>
    );
};

export default EditField;