import Roll, {DefaultResults, DieType, Results} from "../../models/Roll";
import {useState} from "react";
import {Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid} from "@mui/material";
import * as React from "react";
import GenesysDescriptionTypography from "../common/typography/GenesysDescriptionTypography";
import {renderResults, renderRoll, rollDice} from "./RollRenders";
import NumberRangeSelectCard from "../common/NumberRangeSelectCard";

interface Props {
    open: boolean
    onClose: () => void
    diceRoll(): Roll
}

export default function RollDialog(props: Props) {
    const {open, onClose, diceRoll} = props
    const [roll, setRoll] = useState(diceRoll())
    const [rollText, setRollText] = useState(renderRoll(roll))
    const [results, setResults] = useState<Results>(DefaultResults.create())
    const [resultText, setResultText] = useState(renderResults(results))

    const onChange = (type: DieType, value: number) => {
        let temp = roll
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
        setRoll(temp)
        console.log(temp)
        setRollText(renderRoll(temp))
    }

    const onClick = () => {
        setResults(rollDice(diceRoll(), results))
        setResultText(renderResults(results))
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <Card sx={{width: 1}}>
                <DialogTitle style={{textAlign: 'center'}}>Dice Pool</DialogTitle>
                <DialogContent>
                    <Grid container>
                        <NumberRangeSelectCard defaultValue={roll.proficiency} title={DieType.Proficiency}
                                               onChange={(value: number): void => {
                                                   onChange(DieType.Proficiency, value)
                                               }} min={0} max={6}/>
                        <NumberRangeSelectCard defaultValue={roll.ability} title={DieType.Ability}
                                               onChange={(value: number): void => {
                                                   onChange(DieType.Ability, value)
                                               }} min={0} max={6}/>
                        <NumberRangeSelectCard defaultValue={roll.boost} title={DieType.Boost}
                                               onChange={(value: number): void => {
                                                   onChange(DieType.Boost, value)
                                               }} min={0} max={6}/>
                    </Grid>
                    <Divider/>
                    <Grid container>
                        <NumberRangeSelectCard defaultValue={roll.setback} title={DieType.Setback}
                                               onChange={(value: number): void => {
                                                   onChange(DieType.Setback, value)
                                               }} min={0} max={6}/>
                        <NumberRangeSelectCard defaultValue={roll.difficulty} title={DieType.Difficulty}
                                               onChange={(value: number): void => {
                                                   onChange(DieType.Difficulty, value)
                                               }} min={0} max={6}/>
                        <NumberRangeSelectCard defaultValue={roll.challenge} title={DieType.Challenge}
                                               onChange={(value: number): void => {
                                                   onChange(DieType.Challenge, value)
                                               }} min={0} max={6}/>
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