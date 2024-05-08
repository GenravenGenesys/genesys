import Roll, {DefaultResults, Results} from "../../models/Roll";
import {useEffect, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider
} from "@mui/material";
import * as React from "react";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {renderResults, renderRoll} from "./RollRenders";

interface Props {
    open: boolean
    onClose: () => void
    diceRoll(): Roll
}

export default function RollDialog(props: Props) {
    const {open, onClose, diceRoll} = props
    const roll = diceRoll()
    // const [roll, setRoll] = useState<Roll>(diceRoll)
    const [results, setResults] = useState<Results>(DefaultResults.create)
    const [rollText, setRollText] = useState(renderRoll(roll))
    const [resultText, setResultText] = useState(renderResults(results))

    useEffect(() => {
        setResultText(renderResults(results))
    }, [results])

    const onClick = () => {
        results.success = results.success + 1
        setResultText(renderResults(results))
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{textAlign: 'center'}}>Dice Pool</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <GenesysDescriptionTypography text={rollText}/>
                    <Divider/>
                    <GenesysDescriptionTypography text={resultText}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onClick}>ROLL</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}