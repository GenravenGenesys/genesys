import Roll, {DefaultResults, Results} from "../../models/Roll";
import {Fragment, useEffect, useState} from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent, DialogContentText,
    DialogTitle, Divider,
    Grid, Typography
} from "@mui/material";
import * as React from "react";
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

    const onClick = () => {
        results.success = results.success + 1
        setResults(results)
    }

    const renderResults = () => {
        let text = ''
        while (results.success > 0) {
            text = text.concat('[success] ')
            results.success--
        }
        while (results.failure > 0) {
            text = text.concat('[failure] ')
            results.failure--
        }
        while (results.advantage > 0) {
            text = text.concat('[advantage] ')
            results.advantage--
        }
        while (results.threat > 0) {
            text = text.concat('[threat] ')
            results.threat--
        }
        while (results.triumph > 0) {
            text = text.concat('[triumph] ')
            results.triumph--
        }
        while (results.despair > 0) {
            text = text.concat('[despair] ')
            results.despair--
        }
        if (text === null || text === undefined) {
            return '';
        }
        const string = text.split(' ');
        const array = string.map((word: string) => {
            const target = word.toLowerCase();
            switch (true) {
                case target.includes('[advantage]'):
                    return '<i class="symbol advantage"></i>';
                case target.includes('[success]'):
                    return '<i class="symbol success"></i>';
                case target.includes('[triumph]'):
                    return '<i class="symbol triumph"></i>';
                case target.includes('[threat]'):
                    return '<i class="symbol threat"></i>';
                case target.includes('[failure]'):
                    return '<i class="symbol failure"></i>';
                case target.includes('[despair]'):
                    return '<i class="symbol despair"></i>';
                default:
                    return `${word}`;
            }
        });
        let final = '';
        array.forEach((word, index) => {
            if (
                (word.includes('symbol') &&
                    array[index + 1] &&
                    array[index + 1].includes('symbol')) ||
                array.length === index + 1
            ) {
                final += word;
            } else {
                final += `${word} `;
            }
        });
        return (
            <Fragment>
                <Typography style={{wordWrap: 'break-word'}}
                            dangerouslySetInnerHTML={{__html: final}}/>
            </Fragment>
        )
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle style={{textAlign:'center'}}>Dice Pool</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {renderResults()}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='primary' variant='contained' onClick={onClick}>ROLL</Button>
                <Button color='secondary' variant='contained' onClick={onClose}>CANCEL</Button>
            </DialogActions>
        </Dialog>
    )
}