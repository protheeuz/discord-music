const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "puterulang",
  description: "Puter ulang musik saat ini",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["l", "repeat"],
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

    if (player.trackRepeat) {
      player.setTrackRepeat(false);
      client.sendTime(message.channel, `🔂  \`Dinonaktif\``);
    } else {
      player.setTrackRepeat(true);
      client.sendTime(message.channel, `🔂 \`Diaktifkan\``);
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
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const voiceChannel = member.voice.channel;
      let player = await client.Manager.get(interaction.guild_id);
      if (!player)
        return client.sendTime(
          interaction,
          "❌ | **Gaada yang bisa diputer sekarang..**"
        );
      if (!member.voice.channel)
        return client.sendTime(
          interaction,
          "❌ | Lo musti ada didalem voice channel dulu blog, biar gue bisa nyetel musiknya."
        );
      if (
        guild.me.voice.channel &&
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          ":x: | **Dih, masuk kedalem voice channel yang sama dulu. Begooo banget dah!**"
        );

      if (player.trackRepeat) {
        player.setTrackRepeat(false);
        client.sendTime(interaction, `🔂 \`Dinonaktif\``);
      } else {
        player.setTrackRepeat(true);
        client.sendTime(interaction, `🔂 \`Diaktifkan\``);
      }
      console.log(interaction.data);
    },
  },
};
