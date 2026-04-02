import {useEffect, useState} from "react";
import type {Skill, SkillType} from "../api/model";
import {getSkillController} from "../api/generated/skill-controller/skill-controller.ts";

export const useFetchAllSkills = (type?: SkillType) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getSkillController().getAllSkills();
                if (type) {
                    const filtered = response.filter(skill => skill.type === type);
                    setSkills(filtered);
                    return;
                }
                setSkills(response);
            } catch (err) {
                setError('Failed to load qualities. Make sure the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { skills, loading, error };
}