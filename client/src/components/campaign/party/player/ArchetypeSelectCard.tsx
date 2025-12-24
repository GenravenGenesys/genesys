import {Alert, Autocomplete, Card, CardContent, CircularProgress, IconButton, TextField} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {useState} from "react";
import InfoIcon from "@mui/icons-material/Info";
import ArchetypeBackdrop from "../../archetype/ArchetypeBackdrop";
import {useLocation} from "react-router";
import ViewFieldCard from "../../../common/ViewFieldCard";
import GridContainer from "../../../common/grid/GridContainer";
import GridItem from "../../../common/grid/GridItem";
import {useFetchAllArchetypes} from "../../../../hooks/useFetchAllArchetypes.ts";
import type {Archetype} from "../../../../api/model";

interface Props {
    archetype: Archetype;
    onCommit: (value: Archetype) => void;
}

export default function ArchetypeSelectCard(props: Props) {
    const {archetype, onCommit} = props;
    const [openArchetypeBackDrop, setOpenArchetypeBackDrop] = useState(false);
    const {archetypes, loading, error} = useFetchAllArchetypes();

    if (loading) {
        return <CircularProgress/>;
    }

    if (error) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    return useLocation().pathname.endsWith("/view") ? <ViewFieldCard name={"Archetype"} value={archetype.name}/> :
        <GridItem>
            <Card>
                <CenteredCardHeader title={'Archetype'}/>
                <CardContent>
                    <GridContainer>
                        <GridItem width={.9}>
                            <Autocomplete
                                options={archetypes}
                                getOptionLabel={(option) => option.name}
                                value={archetype}
                                fullWidth
                                onChange={(_, newValue) => onCommit(newValue as Archetype)}
                                renderInput={(params) => <TextField {...params} label='Archetype'
                                                                    variant="outlined"/>}
                            />
                        </GridItem>
                        <GridItem width={.1}>
                            <IconButton onClick={(): void => setOpenArchetypeBackDrop(true)}>
                                <InfoIcon/>
                            </IconButton>
                            {openArchetypeBackDrop &&
                                <ArchetypeBackdrop open={openArchetypeBackDrop}
                                                   onClose={(): void => setOpenArchetypeBackDrop(false)}
                                                   archetype={archetype}/>}
                        </GridItem>
                    </GridContainer>
                </CardContent>
            </Card>
        </GridItem>
};