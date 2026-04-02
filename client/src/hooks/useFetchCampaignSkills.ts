import {useEffect, useState} from "react";
import type {Skill, SkillType} from "../api/model";
import {getCampaignSkillController} from "../api/generated/campaign-skill-controller/campaign-skill-controller.ts";

export const useFetchCampaignSkills = (type?: SkillType) => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null); // Reset error state on new calls
            try {
                const response = await getCampaignSkillController().getSkillsForCurrentCampaign();
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