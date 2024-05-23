import Roll, {DefaultResults, DieType, Results} from "../../models/Roll";
import {useState} from "react";
import {
    Button,
    Card, CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid, Typography
} from "@mui/material";
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
    const [roll, setRoll] = useState<Roll>(diceRoll)
    console.log('incoming')
    console.log(roll)
    const initialRoll = renderRoll(roll)
    console.log(initialRoll)
    const [rollText, setRollText] = useState<string>(initialRoll)
    const [results, setResults] = useState<Results>(DefaultResults.create)
    const [resultText, setResultText] = useState<string>(renderResults(results))

    const renderPositiveDiceSelection = () => {
        console.log(roll)
        return (
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
        )
    }

    const onChange = (type: DieType, value: number) => {
        console.log("ROLL")
        console.log(roll)
        console.log(rollText)
        switch (type) {
            case DieType.Boost:
                setRoll({
                    ...roll, boost: roll.boost + value
                })
                break
            case DieType.Ability:
                setRoll({
                    ...roll, ability: roll.ability + value
                })
                break
            case DieType.Proficiency:
                setRoll({
                    ...roll, proficiency: roll.proficiency + value
                })
                break
            case DieType.Setback:
                setRoll({
                    ...roll, setback: roll.setback + value
                })
                break
            case DieType.Difficulty:
                setRoll({
                    ...roll, difficulty: roll.difficulty + value
                })
                break
            case DieType.Challenge:
                setRoll({
                    ...roll, challenge: roll.challenge + value
                })
                break
        }
        setRollText(renderRoll(roll))
        console.log(rollText)
    }

    const onClick = () => {
        setResults(rollDice(roll, results))
        setResultText(renderResults(results))
    }

    const renderRollText = () => {
        console.log(rollText)
        console.log(<Typography component={'div'} style={{ wordWrap: 'break-word', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: rollText}}/>)
        return <Typography component={'div'} style={{ wordWrap: 'break-word', textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: rollText}}/>
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <Card sx={{width: 1}}>
                <DialogTitle style={{textAlign: 'center'}}>Dice Pool</DialogTitle>
                <DialogActions>
                    {renderPositiveDiceSelection()}
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
                </DialogActions>
                <DialogContent>
                    {renderRollText()}
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

interface DiceProps {
    initial: Roll
}

function DiceCard(props: DiceProps) {
    const {initial} = props
    const [roll, setRoll] = useState<Roll>(initial)

    return (
        <Card sx={{width: 1}}>
            <CardActions>

            </CardActions>
        </Card>
    )
}