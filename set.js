const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic1BPZHZYVlNkR1RId0xPSndiT3BQSTBhZzN5VjBIQmhMbnQybkV4KzVWVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM082RFBlVGExWDB1UkpJaUs2TDFzQm9UcjdYbWJxS0pia2dTeS95SHdpYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnSUx1dXp0UzVwTjhvdmVaV2JPTjJ2RWRNYUtkMWhiQm0ySXpmY0M1d0VFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5QUpWeGg0bGpRTGRLenJlZEhydDV5K0tyTzRuZTJOYzdPMHIrSjZxOTB3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktFamZCMy9nWWpSenNKZ1pjRVF4ZGEralJaRVcra1dYR2VjbzE5ZW9FMXc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5vc3g3MXRYem84RHZxSTdmV0VHRUJrNkRoaERyM3VPUTZMM0ZJODJiaTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEtHMFlxSWhHd1ZkcksrbXFPTEViN1B5N1Awc1ZiRjdaUE54enBVTGkxUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic2pKT2FFWWxhSnEzdkZwNnVFZ25DMWNiZDhCVjhHeUh6ancrZlBPSS9Ccz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkExQlFSWU5EcjU2ekEycE4zUzh0WUIyUUEzdEYrNmZFRDAxTnc0d1RUdlNsY3R4Wk5WYjBBZnZ6MGdJZWo2ZkRKL2k4NUJaZHhlNU9lNDNORGhWb0JRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTksImFkdlNlY3JldEtleSI6Im93Z0hMVWlLV2lRcnlidkY1bWgzNjhtMXMvM2N4Y0JWcFc5Tm9sMzRhV2s9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlR5dTZ6Z0FBVEZlbWpkOWx2bDBfOEEiLCJwaG9uZUlkIjoiOGM5OWUyOTEtNDA0Yy00MTMzLTgwMzQtNjRmOTY0OTI1MTUwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImYzL1F0MU9uSlFaSTJQTlVhSmVwMWZQczFRWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJoSmRJRzZObURvUm1rUXlRclRDbG11S2daVzg9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWVEyQkFNUkUiLCJtZSI6eyJpZCI6IjI1NDcyNTY5MzMwNjo2M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJOZWltYW4gTWFyY3VzIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOMzVycHdHRUwvUDRMb0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ5UERUTVY4eFpNbCtEY2RVSWdYRG9rbEQrdDJmbTBQVVF3Mld6YllQaGhvPSIsImFjY291bnRTaWduYXR1cmUiOiJOTmZuSnRCVlc2U3NXZE5JOGwvUE1hVmlpRkJNNEM3Rzd0RTRZY29MRHlXVW9iUTBRdm04SDRtVHZ5V2FZWkE1WmRpU05ZWm9Eekc4dVhnT2s2WDlDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiWWVVMTBxQXBscm4yclRacjJNaUxSdXhSaVZuS1Y0QmtZVWpwTHFnZTh3dThwRW5VcEZJajhmK05kZG5OTGdreDJMa3IycGdYWWxEZlJmUzlPT1ZoQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MjU2OTMzMDY6NjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY2p3MHpGZk1XVEpmZzNIVkNJRnc2SkpRL3JkbjV0RDFFTU5sczIyRDRZYSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMzgzMDYwNiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFamcifQ==',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Neiman Marcus",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254725693306",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'off',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
