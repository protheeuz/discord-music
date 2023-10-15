module.exports = {
  Admins: ["874000382991405156", "874000382991405156"],
  ExpressServer: true,
  DefaultPrefix: process.env.Prefix || "/",
  Port: 3000,
  SupportServer: "https://discord.gg/V79BCZ9u",
  Token:
    process.env.Token ||
    "MTA3MzI4OTMxOTkwMjYyOTkzOA.GefWHG.QOqpG46oM3DKt75enmxVQGS_dSxAZIU7a0jCDk",
  ClientID: process.env.Discord_ClientID || "1073289319902629938",
  ClientSecret:
    process.env.Discord_ClientSecret || "UrTVe6fhUjdlm5B8nyMSkuyOewqiCbmD",
  Scopes: ["identify", "guilds", "applications.commands"],
  ServerDeafen: true,
  DefaultVolume: 100,
  CallbackURL: "/api/callback",
  "24/7": false,
  CookieSecret: "Iqbal is cute",
  IconURL:
    "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif",
  EmbedColor: "RANDOM",
  Permissions: 2205281600,
  Website: process.env.Website || "http://localhost",

  Presence: {
    status: "online",
    name: "Music",
    type: "LISTENING",
  },

  //Lavalink
  Lavalink: {
    id: "Main",
    host: "lava1.horizxon.tech",
    port: 443,
    pass: "horizxon.tech",
    secure: true,
  },

  Spotify: {
    ClientID:
      process.env.Spotify_ClientID || "aa09c61335f34c32b35efa4bfaf1a01c",
    ClientSecret:
      process.env.Spotify_ClientSecret || "df54cdd62337417a83d9604fb47e6de8",
  },
};
