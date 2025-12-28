
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Used to check if the bot is online, replies with pong."),
  async execute(interaction) {
  const embed = new EmbedBuilder()
    .setColor(0xFF0000)
    .setTitle('Pong - 🏓')
    .setTimestamp()
    .setFooter({ text: 'Made by Domiko' });

    const start = Date.now();
    const message = await interaction.reply({ embeds: [embed], withResponse: true });
    const delay = Date.now() - start;
    embed.setDescription(`Delay: ${delay}ms`)
    await interaction.editReply({ embeds: [embed] });
  },
};