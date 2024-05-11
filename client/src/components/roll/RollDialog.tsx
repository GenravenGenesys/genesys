import Roll, {DefaultResults, Results} from "../../models/Roll";
import {useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider} from "@mui/material";
import * as React from "react";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {renderResults, renderRoll, rollDice} from "./RollRenders";

interface Props {
    open: boolean
    onClose: () => void
    diceRoll(): Roll
}

export default function RollDialog(props: Props) {
    const {open, onClose, diceRoll} = props
    let roll = diceRoll()
    const [rollText, setRollText] = useState(renderRoll(roll))
    const [results, setResults] = useState<Results>(DefaultResults.create())
    const [resultText, setResultText] = useState(renderResults(results))

    const onClick = () => {
        setResults(rollDice(diceRoll(), results))
        setResultText(renderResults(results))
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{textAlign: 'center'}}>Dice Pool</DialogTitle>
            <DialogContent>
                <GenesysDescriptionTypography text={rollText}/>
                <Divider/>
                <GenesysDescriptionTypography text={resultText}/>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onClick}>ROLL</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}