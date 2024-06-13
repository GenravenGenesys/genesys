DROP TABLE IF EXISTS Campaign;
DROP TABLE IF EXISTS Party;
DROP TABLE IF EXISTS Session;
DROP TABLE IF EXISTS CampaignSession;

CREATE TABLE IF NOT EXISTS Campaign
(
    campaign_name TEXT PRIMARY KEY,
    party_name    TEXT,
    FOREIGN KEY (party_name) REFERENCES Party (party_name)
);
CREATE TABLE IF NOT EXISTS Party
(
    party_name TEXT PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS Session
(
    session_name TEXT PRIMARY KEY
);
CREATE TABLE IF NOT EXISTS CampaignSession
(
    campaign_name TEXT PRIMARY KEY,
    session_name  TEXT PRIMARY KEY,
    FOREIGN KEY (campaign_name) REFERENCES Campaign (campaign_name),
    FOREIGN KEY (session_name) REFERENCES Session (session_name)
);