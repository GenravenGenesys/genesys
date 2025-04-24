import { Box, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckIcon from '@mui/icons-material/Check';
import { ReactNode } from "react";
import GridContainer from "./grid/GridContainer";
import GridItem from "./grid/GridItem";

interface Props {
    edit: boolean
    editable?: boolean
    viewElement: ReactNode | null
    editElement: ReactNode | null
    onEdit: () => void
    onCancel: () => void
    onCommit: () => void
}

export default function EditField(props: Props): JSX.Element {
    const { edit, editable, viewElement, editElement, onEdit, onCancel, onCommit } = props
    let isEditable = editable ?? true

    const editButton = (
        <IconButton title='Edit' size='small' onClick={(): void => onEdit()}>
            <EditIcon color='primary' fontSize='small' />
        </IconButton>
    )

    const commitButton = (
        <Box component='span'>
            <IconButton title='Commit' size='small' onClick={(): void => onCommit()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>
            <IconButton title='Cancel' size='small' onClick={(): void => onCancel()}>
                <CancelIcon color='primary' fontSize='small' />
            </IconButton>
        </Box>
    )

    if (!isEditable) {
        return (
            <GridItem>
                {viewElement}
            </GridItem>
        )
    }

    return (
        <GridContainer spacing={1}>
            <GridItem>
                {edit ? editElement : viewElement}
            </GridItem>
            <GridItem>
                {edit ? commitButton : editButton}
            </GridItem>
        </GridContainer>
    )
}