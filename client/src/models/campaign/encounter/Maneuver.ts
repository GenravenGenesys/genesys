export default interface Maneuver {
    name: string,
    target: Target,
}

export enum Target {
    Self = 'Self',
    Ally = 'Ally',
    Enemy = 'Enemy'
}