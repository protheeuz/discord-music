const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");
const levels = {
  gaada: 0.0,
  kecil: 0.2,
  lumayan: 0.3,
  kenceng: 0.35,
};
module.exports = {
  name: "jedagjedug",
  description: "Aktifkan jedagjedug dimusik lo.",
  usage: "<gaada|kecil|lumayan|kenceng>",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["bb", "bass"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Gaada yang bisa diputer sekarang..**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Lo musti ada didalem voice channel dulu blog biar gue bisa nyetel musiknya!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Dih, masuk kedalem voice channel yang sama dulu. Begooo banget dah!**"
      );

    if (!args[0])
      return client.sendTime(
        message.channel,
        "**Pilih level jedag-jedug-nya. \nLevel yang tersedia:** `gaada`, `kecil`, `lumayan`, `kenceng`"
      ); //if the user do not provide args [arguments]

    let level = "gaada";
    if (args.length && args[0].toLowerCase() in levels)
      level = args[0].toLowerCase();

    player.setEQ(
      ...new Array(3)
        .fill(null)
        .map((_, i) => ({ band: i, gain: levels[level] }))
    );

    return client.sendTime(
      message.channel,
      `✅ | **Jedag-jeduh disetting ke** \`${level}\``
    );
  },
  SlashCommand: {
    options: [
      {
        name: "level",
        description: `Pilih level jedag-jedug-nya. Level yang tersedia: gaada, kecil, lumayan, or kenceng`,
        value: "[level]",
        type: 3,
        required: true,
      },
    ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */

    run: async (client, interaction, args, { GuildDB }) => {
      const levels = {
        gaada: 0.0,
        low: 0.2,
        lumayan: 0.3,
        kenceng: 0.35,
      };

      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = member.voice.channel;
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Gaada yang bisa diputer sekarang..**"
        );
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | **Lo musti ada didalem voice channel dulu blog, biar gue bisa nyetel musiknya.**"
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(voiceChannel)
      )
        return client.sendTime(
          interaction,
          ":x: | **Dih, masuk kedalem voice channel yang sama dulu. Begooo banget dah!**"
        );
      if (!args)
        return client.sendTime(
          interaction,
          "**Pilih level jedag-jedug-nya. \nLevel yang tersedia:** `gaada`, `kecil`, `lumayan`, `kenceng`"
        ); //if the user do not provide args [arguments]

      let level = "gaada";
      if (args.length && args[0].value in levels) level = args[0].value;

      player.setEQ(
        ...new Array(3)
          .fill(null)
          .map((_, i) => ({ band: i, gain: levels[level] }))
      );

      return client.sendTime(
        interaction,
        `✅ | **Atur jedag-jeduhnya ke** \`${level}\``
      );
    },
  },
};
