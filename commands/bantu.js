const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "bantu",
  description: "Informasi tentang gue",
  usage: "[command]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["command", "commands", "cmd"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let Commands = client.commands.map(
      (cmd) =>
        `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
    );

    let Embed = new MessageEmbed()
      .setAuthor(
        `Perintah dari puh ${client.user.username}`,
        client.botconfig.IconURL
      )
      .setColor(client.botconfig.EmbedColor)
      .setFooter(
        `Untuk mendapatkan info setiap jenis perintah ${
          GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
        }help [Command] | Semoga harimu senin terus!`
      ).setDescription(`${Commands.join("\n")}
  
      Versi Bot Musik Discord: v${require("../package.json").version}
  [✨ Support Server](${
    client.botconfig.SupportServer
  }) | [GitHub](https://github.com/protheeuz/discord-music) | [Dashboard](${
      client.botconfig.Website
    }) | By [Protheeuz](https://github.com/protheeuz/)`);
    if (!args[0]) message.channel.send(Embed);
    else {
      let cmd =
        client.commands.get(args[0]) ||
        client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
      if (!cmd)
        return client.sendTime(
          message.channel,
          `❌ | Gaada command yang lo cari blog`
        );

      let embed = new MessageEmbed()
        .setAuthor(`Command: ${cmd.name}`, client.botconfig.IconURL)
        .setDescription(cmd.description)
        .setColor("GREEN")
        //.addField("Name", cmd.name, true)
        .addField("Aliases", `\`${cmd.aliases.join(", ")}\``, true)
        .addField(
          "Penggunaan",
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
          true
        )
        .addField(
          "Permissions",
          "Member: " +
            cmd.permissions.member.join(", ") +
            "\nBot: " +
            cmd.permissions.channel.join(", "),
          true
        )
        .setFooter(
          `Prefix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
        );

      message.channel.send(embed);
    }
  },

  SlashCommand: {
    options: [
      {
        name: "command",
        description: "Dapatkan informasi tentang perintah tertentu",
        value: "command",
        type: 3,
        required: false,
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
      let Commands = client.commands.map(
        (cmd) =>
          `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
      );

      let Embed = new MessageEmbed()
        .setAuthor(
          `Commands dari ${client.user.username}`,
          client.botconfig.IconURL
        )
        .setColor(client.botconfig.EmbedColor)
        .setFooter(
          `Untuk mencari tau info command ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }help [Command] | Have a nice day!`
        ).setDescription(`${Commands.join("\n")}
  
        Versi Bot Musik Discord: v${require("../package.json").version}
  [✨ Support Server](${
    client.botconfig.SupportServer
  }) | [GitHub](https://github.com/protheeuz/discord-music) | [Dashboard](${
        client.botconfig.Website
      }) | By [Protheeuz](https://github.com/protheeuz/)`);
      if (!args) return interaction.send(Embed);
      else {
        let cmd =
          client.commands.get(args[0].value) ||
          client.commands.find(
            (x) => x.aliases && x.aliases.includes(args[0].value)
          );
        if (!cmd)
          return client.sendTime(
            interaction,
            `❌ | Gaada command yang lo cari blog`
          );

        let embed = new MessageEmbed()
          .setAuthor(`Command: ${cmd.name}`, client.botconfig.IconURL)
          .setDescription(cmd.description)
          .setColor("GREEN")
          //.addField("Name", cmd.name, true)
          .addField("Aliases", cmd.aliases.join(", "), true)
          .addField(
            "Penggunaan",
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
              cmd.name
            }\`${cmd.usage ? " " + cmd.usage : ""}`,
            true
          )
          .addField(
            "Permissions",
            "Member: " +
              cmd.permissions.member.join(", ") +
              "\nBot: " +
              cmd.permissions.channel.join(", "),
            true
          )
          .setFooter(
            `Awalan - ${
              GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
            }`
          );

        interaction.send(embed);
      }
    },
  },
};
