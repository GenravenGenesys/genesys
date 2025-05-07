export default interface Lore {
    id: string
    name: string
    type: LoreType
    description: string
}

export enum LoreType {
    ORGANIZATION = 'Organization'
}