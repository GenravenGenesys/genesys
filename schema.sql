DROP TABLE IF EXISTS MinionSkill;
DROP TABLE IF EXISTS MinionTalent;
DROP TABLE IF EXISTS MinionAbility;
DROP TABLE IF EXISTS MinionWeapons;
DROP TABLE IF EXISTS MinionArmor;
DROP TABLE IF EXISTS MinionGear;
DROP TABLE IF EXISTS Minion;

DROP TABLE IF EXISTS RivalSkill;
DROP TABLE IF EXISTS RivalTalent;
DROP TABLE IF EXISTS RivalInjury;
DROP TABLE IF EXISTS RivalAbility;
DROP TABLE IF EXISTS RivalWeapons;
DROP TABLE IF EXISTS RivalArmor;
DROP TABLE IF EXISTS RivalGear;
DROP TABLE IF EXISTS Rival;

DROP TABLE IF EXISTS NemesisSkill;
DROP TABLE IF EXISTS NemesisTalent;
DROP TABLE IF EXISTS NemesisInjury;
DROP TABLE IF EXISTS NemesisAbility;
DROP TABLE IF EXISTS NemesisWeapons;
DROP TABLE IF EXISTS NemesisArmor;
DROP TABLE IF EXISTS NemesisGear;
DROP TABLE IF EXISTS Nemesis;

DROP TABLE IF EXISTS Player;

DROP TABLE IF EXISTS Gear;

DROP TABLE IF EXISTS WeaponModification;
DROP TABLE IF EXISTS WeaponQuality;
DROP TABLE IF EXISTS Weapon;

DROP TABLE IF EXISTS ArmorModification;
DROP TABLE IF EXISTS ArmorQuality;
DROP TABLE IF EXISTS Armor;

DROP TABLE IF EXISTS Skill;

DROP TABLE IF EXISTS AbilityModification;
DROP TABLE IF EXISTS Ability;

DROP TABLE IF EXISTS TalentModification;
DROP TABLE IF EXISTS Talent;

DROP TABLE IF EXISTS QualityModification;
DROP TABLE IF EXISTS Quality;

DROP TABLE IF EXISTS Spell;

DROP TABLE IF EXISTS InjuryModification;
DROP TABLE IF EXISTS Injury;

DROP TABLE IF EXISTS CampaignSession;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS Party;
DROP TABLE IF EXISTS Campaign;

CREATE TABLE IF NOT EXISTS Injury
(
    injury_id   INTEGER PRIMARY KEY,
    name        TEXT,
    description TEXT,
    severity    TEXT,
    min         INTEGER,
    max         INTEGER
);
CREATE TABLE IF NOT EXISTS InjuryModification
(
    injury_id INTEGER,
    type      TEXT,
    ranks     INTEGER,
    FOREIGN KEY (injury_id) REFERENCES Injury (injury_id)
);
CREATE TABLE IF NOT EXISTS Spell
(
    spell_id      INTEGER PRIMARY KEY,
    name          TEXT,
    description   TEXT,
    difficulty    TEXT,
    concentration INTEGER
);
CREATE TABLE IF NOT EXISTS Quality
(
    quality_id  INTEGER PRIMARY KEY,
    name        TEXT,
    description TEXT,
    passive     INTEGER,
    cost        INTEGER,
    armor       INTEGER,
    weapon      INTEGER
);
CREATE TABLE IF NOT EXISTS QualityModification
(
    quality_id INTEGER,
    type       TEXT,
    ranks      INTEGER,
    FOREIGN KEY (quality_id) REFERENCES Quality (quality_id)
);

-- CAMPAIGN META TABLES
CREATE TABLE IF NOT EXISTS Campaign
(
    campaign_id INTEGER PRIMARY KEY,
    name        TEXT,
    party_id    INTEGER,
    FOREIGN KEY (party_id) REFERENCES Party (party_id)
);
CREATE TABLE IF NOT EXISTS Party
(
    party_id INTEGER PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS Session
(
    session_id INTEGER PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS CampaignSession
(
    campaign_id INTEGER,
    session_id  INTEGER,
    FOREIGN KEY (campaign_id) REFERENCES Campaign (campaign_id),
    FOREIGN KEY (session_id) REFERENCES Session (session_id)
);

-- CAMPAIGN ITEM TABLES
CREATE TABLE IF NOT EXISTS Talent
(
    talent_id   INTEGER PRIMARY KEY,
    name        TEXT,
    description TEXT,
    summary     TEXT,
    activation  TEXT,
    tier        TEXT,
    ranked      INTEGER
);
CREATE TABLE IF NOT EXISTS TalentModification
(
    talent_id INTEGER,
    type      TEXT,
    ranks     INTEGER,
    FOREIGN KEY (talent_id) REFERENCES Talent (talent_id)
);
CREATE TABLE IF NOT EXISTS Ability
(
    ability_id  INTEGER PRIMARY KEY,
    name        TEXT,
    description TEXT,
    activation  TEXT
);
CREATE TABLE IF NOT EXISTS AbilityModification
(
    ability_id INTEGER,
    type       TEXT,
    ranks      INTEGER,
    FOREIGN KEY (ability_id) REFERENCES Ability (ability_id)
);
CREATE TABLE IF NOT EXISTS Skill
(
    skill_id       INTEGER PRIMARY KEY,
    name           TEXT,
    type           TEXT,
    characteristic TEXT
);
CREATE TABLE IF NOT EXISTS Armor
(
    armor_id    INTEGER PRIMARY KEY,
    name        TEXT,
    description TEXT,
    price       INTEGER,
    restricted  INTEGER,
    encumbrance INTEGER,
    rarity      INTEGER,
    soak        INTEGER,
    defense     INTEGER
);
CREATE TABLE IF NOT EXISTS ArmorModification
(
    armor_id INTEGER,
    type     TEXT,
    ranks    INTEGER,
    FOREIGN KEY (armor_id) REFERENCES Armor (armor_id)
);
CREATE TABLE IF NOT EXISTS ArmorQuality
(
    armor_id   INTEGER,
    quality_id INTEGER,
    ranks      INTEGER,
    FOREIGN KEY (armor_id) REFERENCES Armor (armor_id),
    FOREIGN KEY (quality_id) REFERENCES Quality (quality_id)
);
CREATE TABLE IF NOT EXISTS Weapon
(
    weapon_id   INTEGER PRIMARY KEY,
    name        TEXT,
    description TEXT,
    price       INTEGER,
    restricted  INTEGER,
    encumbrance INTEGER,
    rarity      INTEGER,
    damage      INTEGER,
    critical    INTEGER,
    range       TEXT,
    brawn       INTEGER,
    hands       INTEGER,
    skill_id    INTEGER,
    FOREIGN KEY (skill_id) REFERENCES Skill (skill_id)
);
CREATE TABLE IF NOT EXISTS WeaponModification
(
    weapon_id INTEGER,
    type      TEXT,
    ranks     INTEGER,
    FOREIGN KEY (weapon_id) REFERENCES Weapon (weapon_id)
);
CREATE TABLE IF NOT EXISTS WeaponQuality
(
    weapon_id  INTEGER,
    quality_id INTEGER,
    ranks      INTEGER,
    FOREIGN KEY (weapon_id) REFERENCES Weapon (weapon_id),
    FOREIGN KEY (quality_id) REFERENCES Quality (quality_id)
);
CREATE TABLE IF NOT EXISTS Gear
(
    gear_id     INTEGER PRIMARY KEY,
    name        TEXT,
    description TEXT,
    price       INTEGER,
    restricted  INTEGER,
    encumbrance INTEGER,
    rarity      INTEGER
);

-- Actor Tables
CREATE TABLE IF NOT EXISTS Nemesis
(
    actor_id  INTEGER PRIMARY KEY,
    name      TEXT,
    combat    INTEGER,
    social    INTEGER,
    general   INTEGER,
    type      TEXT,
    brawn     INTEGER,
    agility   INTEGER,
    intellect INTEGER,
    cunning   INTEGER,
    willpower INTEGER,
    presence  INTEGER,
    wounds    INTEGER,
    strain    INTEGER
);

CREATE TABLE IF NOT EXISTS Rival
(
    actor_id  INTEGER PRIMARY KEY,
    name      TEXT,
    combat    INTEGER,
    social    INTEGER,
    general   INTEGER,
    type      TEXT,
    brawn     INTEGER,
    agility   INTEGER,
    intellect INTEGER,
    cunning   INTEGER,
    willpower INTEGER,
    presence  INTEGER,
    wounds    INTEGER
);
CREATE TABLE IF NOT EXISTS RivalSkill
(
    actor_id INTEGER,
    skill_id INTEGER,
    ranks    INTEGER,
    FOREIGN KEY (actor_id) REFERENCES Rival (actor_id),
    FOREIGN KEY (skill_id) REFERENCES Skill (skill_id)
);
CREATE TABLE IF NOT EXISTS RivalTalent
(
    actor_id  INTEGER,
    talent_id INTEGER,
    ranks     INTEGER,
    FOREIGN KEY (actor_id) REFERENCES Rival (actor_id),
    FOREIGN KEY (talent_id) REFERENCES Talent (talent_id)
);
CREATE TABLE IF NOT EXISTS RivalInjury
(
    actor_id  INTEGER,
    injury_id INTEGER,
    ranks     INTEGER,
    FOREIGN KEY (actor_id) REFERENCES Rival (actor_id),
    FOREIGN KEY (injury_id) REFERENCES Injury (injury_id)
);
CREATE TABLE IF NOT EXISTS RivalAbility
(
    actor_id   INTEGER,
    ability_id INTEGER,
    ranks      INTEGER,
    FOREIGN KEY (actor_id) REFERENCES Rival (actor_id),
    FOREIGN KEY (ability_id) REFERENCES Ability (ability_id)
);
CREATE TABLE IF NOT EXISTS RivalWeapon
(
    actor_id  INTEGER,
    weapon_id INTEGER,
    slot      TEXT,
    FOREIGN KEY (actor_id) REFERENCES Rival (actor_id),
    FOREIGN KEY (weapon_id) REFERENCES Weapon (weapon_id)
);
CREATE TABLE IF NOT EXISTS RivalArmor
(
    actor_id INTEGER,
    armor_id INTEGER,
    slot     TEXT,
    FOREIGN KEY (actor_id) REFERENCES Rival (actor_id),
    FOREIGN KEY (armor_id) REFERENCES Armor (armor_id)
);
CREATE TABLE IF NOT EXISTS RivalGear
(
    actor_id INTEGER,
    gear_id  INTEGER,
    FOREIGN KEY (actor_id) REFERENCES Rival (actor_id),
    FOREIGN KEY (gear_id) REFERENCES Gear (gear_id)
);
CREATE TABLE IF NOT EXISTS Minion
(
    actor_id  INTEGER PRIMARY KEY,
    name      TEXT,
    combat    INTEGER,
    social    INTEGER,
    general   INTEGER,
    type      TEXT,
    brawn     INTEGER,
    agility   INTEGER,
    intellect INTEGER,
    cunning   INTEGER,
    willpower INTEGER,
    presence  INTEGER,
    wounds    INTEGER
);