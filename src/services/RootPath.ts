export enum RootPath {
    Home = 'home',
    Talent = '/talents/',
    Skills = '/skills/',
    Lore = '/lore',
    Roll = '/roll',
    Setting = '/settings/',
    Qualities = '/qualities/',
    Injury = '/injuries/',
    Spell = '/spells/',
    Career = '/careers/',
    Archetype = '/archetypes/',
}

export enum EquipmentPath {
    Armor = '/equipment/armors/',
    Weapon = '/equipment/weapons/',
    Gear = '/equipment/gears/',
}

export enum ModificationPath {
    ModificationInjury = '/modifications' + RootPath.Injury,
    ModificationTalent = '/modifications' + RootPath.Talent,
    ModificationQuality = '/modifications' + RootPath.Qualities,
    ModificationArmor = '/modifications' + EquipmentPath.Armor,
}

export enum LorePath {
    Organization = '/lore/organizations/',
}

export enum ActorPath {
    Actor = '/actors/',
    Player = '/actors/players/',
    Nemesis = '/actors/nemeses/',
    Rival = '/actors/rivals/',
    Minion = '/actors/minions/',
    Npc = '/actors/npcs'
}

export enum CampaignPath {
    Campaign = '/campaigns/',
    Party = '/party/',
    Session = '/sessions/',
    Scene = '/scenes/',
}