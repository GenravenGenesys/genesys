export default interface Talent {
    name: string,
    ranked: Ranked,
    activation: Activation,
    tier: Tier,
    description: string
}

export enum Ranked {
    No = 'No',
    Yes = 'Yes'
}

export enum Activation {
    Passive = 'Passive',
    ActiveAction = 'Active (Action)',
    ActiveManeuver = 'Active (Maneuver)',
    ActiveIncidental = 'Active (Incidental)',
    ActiveIncidentalOutOfTurn = 'Active (Incidental, Out of Turn)'
}

export enum Tier {
    First = 'First',
    Second = 'Second',
    Third = 'Third',
    Fourth = 'Fourth',
    Fifth = 'Fifth'
}

export enum TalentKey {
    Name= 'name',
    Ranked= 'ranked',
    Activation= 'activation',
    Tier= 'tier',
    Description= 'description'
}

export interface ActorTalent extends Talent {
    ranks: number
}

export class DefaultTalent {
    static create(): Talent {
        return {
            name: '',
            ranked: Ranked.No,
            activation: Activation.Passive,
            tier: Tier.First,
            description: ''
        };
    }
}