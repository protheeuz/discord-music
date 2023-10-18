const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "pindah",
  description: `Pindah lagu dari antrian`,
  usage: "[number]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["rm"],

  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1);
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

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("Gaada antrian yang bisa dipindah");
    let rm = new MessageEmbed()
      .setDescription(
        `✅ **|** Pindah track **\`${Number(args[0])}\`** dari antrian!`
      )
      .setColor("GREEN");
    if (isNaN(args[0]))
      rm.setDescription(
        `**Penggunaan - **${client.botconfig.prefix}\`pindah [track]\``
      );
    if (args[0] > player.queue.length)
      rm.setDescription(`Antrian hanya berisi ${player.queue.length} lagu!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },

  SlashCommand: {
    options: [
      {
        name: "track",
        value: "[track]",
        type: 4,
        required: true,
        description: "Pindah lagu dari antrian",
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
      let player = await client.Manager.get(interaction.guild_id);
      const guild = client.guilds.cache.get(interaction.guild_id);
      const member = guild.members.cache.get(interaction.member.user.id);
      const song = player.queue.slice(args[0] - 1, 1);
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
        !guild.me.voice.channel.equals(member.voice.channel)
      )
        return client.sendTime(
          interaction,
          ":x: | **Dih, masuk kedalem voice channel yang sama dulu. Begooo banget dah!**"
        );

      if (!player.queue || !player.queue.length || player.queue.length === 0)
        return client.sendTime("❌ | **Gaada yang bisa diputer sekarang..**");
      let rm = new MessageEmbed()
        .setDescription(
          `✅ | **Pindah track** \`${Number(args[0])}\` dari antrian!`
        )
        .setColor("GREEN");
      if (isNaN(args[0]))
        rm.setDescription(
          `**Penggunaan:** \`${GuildDB.prefix}pindah [track]\``
        );
      if (args[0] > player.queue.length)
        rm.setDescription(
          `Antrian hanya bisa memiliki ${player.queue.length} lagu!`
        );
      await interaction.send(rm);
      player.queue.remove(Number(args[0]) - 1);
    },
  },
};
