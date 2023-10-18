module.exports = {
  Admins: ["874000382991405156", "874000382991405156"],
  ExpressServer: true,
  DefaultPrefix: process.env.Prefix || "/",
  Port: 3000,
  SupportServer: "https://discord.gg/V79BCZ9u",
  Token: process.env.Token || "",
  ClientID: process.env.Discord_ClientID || "",
  ClientSecret: process.env.Discord_ClientSecret || "",
  Scopes: ["identify", "guilds", "applications.commands"],
  ServerDeafen: true,
  DefaultVolume: 100,
  CallbackURL: "/api/callback",
  "24/7": false,
  CookieSecret: "Iqbal is cute",
  IconURL:
    "https://raw.githubusercontent.com/protheeuz/discord-music/main/assets/logo.gif",
  EmbedColor: "RANDOM",
  Permissions: 2205281600,
  Website: process.env.Website || "http://localhost",

  Presence: {
    status: "online",
    name: "Dangdut",
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
    ClientID: process.env.Spotify_ClientID || "",
    ClientSecret: process.env.Spotify_ClientSecret || "",
  },
};
