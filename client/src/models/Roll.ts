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

export enum ResultType {
    Success='[success]',
    Failure='[failure]',
    Advantage='[advantage]',
    Threat='[threat]',
    Triumph='[triumph]',
    Despair='[despair]',
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
            success: 4,
            threat: 2,
            triumph: 1
        }
    }
}

export class DefaultRoll {
    static create(): Roll {
        return {
            ability: 3,
            advantage: 1,
            boost: 1,
            challenge: 0,
            despair: 0,
            difficulty: 2,
            failure: 0,
            proficiency: 0,
            setback: 0,
            success: 0,
            threat: 0,
            triumph: 0
        }
    }
}