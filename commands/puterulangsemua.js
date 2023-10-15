const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "puterulangsemua",
  description: "Puter ulang semua antrian",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["lq", "repeatqueue", "rq"],
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

    if (player.queueRepeat) {
      player.setQueueRepeat(false);
      client.sendTime(
        message.channel,
        `:repeat: Antiria yang diputerulang \`dinonaktifkan\``
      );
    } else {
      player.setQueueRepeat(true);
      client.sendTime(
        message.channel,
        `:repeat: Antiria yang diputerulang \`diaktifkan\``
      );
    }
  },
  SlashCommand: {
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, interaction, args, { GuildDB }) => {
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = member.voice.channel;
      let awaitchannel = client.channels.cache.get(interaction.channel_id); /// thanks Reyansh for this idea ;-;
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

      if (player.queueRepeat) {
        player.setQueueRepeat(false);
        client.sendTime(
          interaction,
          `:repeat: **Antiria yang diputerulang** \`diaktifkan\``
        );
      } else {
        player.setQueueRepeat(true);
        client.sendTime(
          interaction,
          `:repeat: **Antiria yang diputerulang** \`diaktifkan\``
        );
      }
      console.log(interaction.data);
    },
  },
};
