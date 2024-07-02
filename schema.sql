-- SYSTEM TABLES
DROP TABLE IF EXISTS Injury;
DROP TABLE IF EXISTS InjuryModification;
DROP TABLE IF EXISTS Spell;
DROP TABLE IF EXISTS Quality;
DROP TABLE IF EXISTS QualityModification;

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
DROP TABLE IF EXISTS Campaign;
DROP TABLE IF EXISTS Party;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS CampaignSession;

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
DROP TABLE IF EXISTS Talent;
DROP TABLE IF EXISTS TalentModification;
DROP TABLE IF EXISTS Ability;
DROP TABLE IF EXISTS AbilityModification;
DROP TABLE IF EXISTS Skill;
DROP TABLE IF EXISTS Armor;
DROP TABLE IF EXISTS ArmorModification;
DROP TABLE IF EXISTS ArmorQuality;

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
    skill_id    INTEGER
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