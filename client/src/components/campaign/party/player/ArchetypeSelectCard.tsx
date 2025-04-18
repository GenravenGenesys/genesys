import {Autocomplete, Card, CardContent, Grid, IconButton, TextField} from "@mui/material";
import CenteredCardHeader from "../../../common/card/header/CenteredCardHeader";
import {useEffect, useState} from "react";
import Archetype from "../../../../models/actor/player/Archetype";
import ArchetypeService from "../../../../services/ArchetypeService";
import InfoIcon from "@mui/icons-material/Info";
import * as React from "react";
import ArchetypeBackdrop from "../../archetype/ArchetypeBackdrop";
import {useLocation} from "react-router-dom";
import ViewFieldCard from "../../../common/ViewFieldCard";

interface Props {
    archetype: Archetype;
    onCommit: (value: Archetype) => void;
}

export default function ArchetypeSelectCard(props: Props) {
    const {archetype, onCommit} = props;
    const [archetypes, setArchetypes] = useState<Archetype[]>([]);
    const [openArchetypeBackDrop, setOpenArchetypeBackDrop] = useState(false);

    useEffect(() => {
        (async (): Promise<void> => {
            setArchetypes(await ArchetypeService.getArchetypes());
        })()
    }, [setArchetypes])

    return useLocation().pathname.endsWith("/view") ? <ViewFieldCard name={"Archetype"} value={archetype.name}/> :
        <Grid item xs>
            <Card>
                <CenteredCardHeader title={'Archetype'}/>
                <CardContent>
                    <Grid container>
                        <Grid item sx={{"width": .9}}>
                            <Autocomplete
                                options={archetypes}
                                getOptionLabel={(option) => option.name}
                                value={archetype}
                                fullWidth
                                onChange={(e, newValue) => onCommit(newValue as Archetype)}
                                renderInput={(params) => <TextField {...params} label='Archetype'
                                                                    variant="outlined"/>}
                            />
                        </Grid>
                        <Grid item sx={{"width": .1}}>
                            <IconButton onClick={(): void => setOpenArchetypeBackDrop(true)}>
                                <InfoIcon/>
                            </IconButton>
                            {openArchetypeBackDrop &&
                                <ArchetypeBackdrop open={openArchetypeBackDrop}
                                                   onClose={(): void => setOpenArchetypeBackDrop(false)}
                                                   archetype={archetype}/>}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>
};