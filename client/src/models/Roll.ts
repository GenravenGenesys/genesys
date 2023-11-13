export default interface Roll extends Results {
    boost: number
    setback: number
    ability: number
    difficulty: number
    proficiency: number
    challenge: number
}

export interface Results {
    success: number
    advantage: number
    triumph: number
    failure: number
    threat: number
    despair: number
}

export enum DieType {
    Boost= '[boost]',
    Ability = '[ability]',
    Proficiency = '[proficiency]',
    Setback = '[setback]',
    Difficulty = '[difficulty]',
    Challenge = '[challenge]'
}

export class DefaultResults {
    static create(): Results {
        return {
            advantage: 0,
            despair: 0,
            failure: 0,
            success: 0,
            threat: 0,
            triumph: 0
        }
    }

    static createWithRoll(roll: Roll): Results {
        return {
            advantage: roll.advantage,
            despair: roll.despair,
            failure: roll.failure,
            success: roll.success,
            threat: roll.threat,
            triumph: roll.triumph
        }
    }
}

export class DefaultRoll {
    static create(): Roll {
        return {
            ability: 0,
            advantage: 0,
            boost: 12,
            challenge: 0,
            despair: 0,
            difficulty: 0,
            failure: 0,
            proficiency: 0,
            setback: 0,
            success: 0,
            threat: 0,
            triumph: 0
        }
    }
}