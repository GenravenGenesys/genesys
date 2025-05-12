import {Card, CardContent, CardHeader, Divider} from "@mui/material"
import InlineTextField from "./InlineTextField"
import GridItem from "./grid/GridItem";
import CenteredCardHeader from "./card/header/CenteredCardHeader";
import React from "react";

type Props = {
    defaultValue: string;
    onCommit: (value: string) => void;
    title: string;
    helperText: string;
    placeholder: string;
    errorText?: string;
};

const InputTextFieldCard: React.FC<Props> = ({defaultValue, onCommit, title, helperText, placeholder, errorText}) => {
    return (
        <GridItem>
            <Card>
                <CenteredCardHeader title={title}/>
                <CardContent>
                    <InlineTextField defaultValue={defaultValue} editable={true} onCommit={onCommit}
                                     helperText={helperText}
                                     placeholder={placeholder} errorText={errorText}/>
                </CardContent>
            </Card>
        </GridItem>
    );
};

export default InputTextFieldCard;