import Roll, {DefaultResults, DieType, Results} from "../../models/Roll";
import {useEffect, useState} from "react";
import {Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import * as React from "react";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {renderResults, renderRoll, rollDice} from "./RollRenders";
import DiceSelectCard from "../common/DiceSelectCard";

interface Props {
    open: boolean
    onClose: () => void
    diceRoll: Roll
}

export default function RollDialog(props: Props) {
    const {open, onClose, diceRoll} = props
    let incoming = diceRoll
    console.log("incoming")
    console.log(incoming)
    const [roll, setRoll] = useState<Roll>(incoming)
    const [rollText, setRollText] = useState<string>(renderRoll(roll))
    const [results, setResults] = useState<Results>(DefaultResults.create())
    const [resultText, setResultText] = useState<string>(renderResults(results))

    const onChange = (type: DieType, value: number) => {
        let temp = roll
        console.log("ROLL")
        console.log(rollText)
        switch (type) {
            case DieType.Boost:
                temp.boost = temp.boost + value
                break
            case DieType.Ability:
                temp.ability = temp.ability + value
                break
            case DieType.Proficiency:
                temp.proficiency = temp.proficiency + value
                break
            case DieType.Setback:
                temp.setback = temp.setback + value
                break
            case DieType.Difficulty:
                temp.difficulty = temp.difficulty + value
                break
            case DieType.Challenge:
                temp.challenge = temp.challenge + value
                break
        }
        console.log("CHANGE")
        setRoll(temp)
        setRollText(renderRoll(temp))
        console.log(rollText)
    }

    const onClick = () => {
        setResults(rollDice(roll, results))
        setResultText(renderResults(results))
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <Card sx={{width: 1}}>
                <DialogTitle style={{textAlign: 'center'}}>Dice Pool</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <DiceSelectCard defaultValue={roll.proficiency} type={DieType.Proficiency}
                                        onChange={(value: number): void => {
                                            onChange(DieType.Proficiency, value)
                                        }}/>
                        <DiceSelectCard defaultValue={roll.ability} type={DieType.Ability}
                                        onChange={(value: number): void => {
                                            onChange(DieType.Ability, value)
                                        }}/>
                        <DiceSelectCard defaultValue={roll.boost} type={DieType.Boost}
                                        onChange={(value: number): void => {
                                            onChange(DieType.Boost, value)
                                        }}/>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <DiceSelectCard defaultValue={roll.challenge} type={DieType.Challenge}
                                        onChange={(value: number): void => {
                                            onChange(DieType.Challenge, value)
                                        }}/>
                        <DiceSelectCard defaultValue={roll.difficulty} type={DieType.Difficulty}
                                        onChange={(value: number): void => {
                                            onChange(DieType.Difficulty, value)
                                        }}/>
                        <DiceSelectCard defaultValue={roll.setback} type={DieType.Setback}
                                        onChange={(value: number): void => {
                                            onChange(DieType.Setback, value)
                                        }}/>
                    </Grid>
                    <Divider/>
                    <GenesysDescriptionTypography text={rollText}/>
                    <Divider/>
                    <GenesysDescriptionTypography text={resultText}/>
                </DialogContent>
                <DialogActions>
                    <Button color='primary' variant='contained' onClick={onClick}>ROLL</Button>
                    <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
                </DialogActions>
            </Card>
        </Dialog>
    )
}