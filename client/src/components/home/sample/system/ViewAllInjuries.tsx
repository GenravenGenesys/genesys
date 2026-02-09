import {useState} from "react";
import type {Career, CriticalInjury} from "../../../../api/model";
import {emptyCareer, emptyCriticalInjury} from "../../../../models/Template.ts";
import {useFetchAllInjuries} from "../../../../hooks/injuries/useFetchAllInjuries.ts";
import {useCreateInjury, useUpdateInjury} from "../../../../api/generated/injury-controller/injury-controller.ts";
import {Alert, CircularProgress} from "@mui/material";

export default function ViewAllInjuries() {
    const [search, setSearch] = useState("");
    const [openDrawer, setOpenDrawer] = useState(false);
    const [criticalInjury, setCriticalInjury] = useState<CriticalInjury>(emptyCriticalInjury);
    const [isNew, setIsNew] = useState(false);
    const headers = ["Name", "Actions"];

    const {injuries, loading, error} = useFetchAllInjuries();
    const createInjuryMutation = useCreateInjury();
    const updateInjuryMutation = useUpdateInjury();

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

    const filteredCriticalInjury = injuries.filter((injury: CriticalInjury) =>
        injury.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenCreate = () => {
        setIsNew(true);
        setOpenDrawer(true);
    };

    const handleOpenEdit = (career: Career) => {
        setCriticalInjury(career);
        setIsNew(false);
        setOpenDrawer(true);
    };

    const handleSave = async (injury: CriticalInjury) => {
        if (isNew) {
            await createInjuryMutation.mutateAsync({
                data: injury
            });
        } else {
            await updateInjuryMutation.mutateAsync({
                id: injury.id,
                data: injury
            });
        }

        setCareer(emptyCareer);
    };

    return (
        <div>
            <h2>All Injuries</h2>
            <p>This is where you would see a list of all injuries in the system.</p>
        </div>
    );
}