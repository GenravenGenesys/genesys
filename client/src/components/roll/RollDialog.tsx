import Roll, {DefaultResults, Results} from "../../models/Roll";
import {useEffect, useState} from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider,
    Grid
} from "@mui/material";
import * as React from "react";
import {GenesysResultsConversion} from "./GenesysRollConversion";
import Backdrop from "@mui/material/Backdrop";
import CenteredCardHeader from "../common/card/CenteredCardHeader";
import ViewRollTable from "./ViewRollTable";

interface Props {
    open: boolean
    onClose: () => void
    diceRoll: Roll
}

export default function RollDialog(props: Props) {
    const {open, onClose, diceRoll} = props
    const [roll, setRoll] = useState<Roll>(diceRoll)
    const [results, setResults] = useState<Results>(DefaultResults.create())

    useEffect(() => {
        setResults(results)
    }, [results])

    const onClick = async () => {
        let res = DefaultResults.create()
        res.success = res.success + 1
        console.log(res)
        setResults(res)
    }

    const renderResults = () => {
        console.log(results)
        return results && <GenesysResultsConversion results={results}/>
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{textAlign:'center'}}>Dice Pool</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <GenesysResultsConversion results={results}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onClick}>ROLL</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}