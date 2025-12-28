
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
const { token } = require("../config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const initCommands = require("./commands/commands.js");

client.commands = new Collection();
initCommands(client);

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as:\n${readyClient.user.tag}`)
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: "There was an error with executing this command!", ephemeral: true })
  }
});

// IF U WANT PREFIX COMMANDS add this ->
/*
client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ban') {
        // PERMISSION CHECK: Check if the user is a mod
        if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return message.reply("❌ Only Moderators can use this command.");
        }

        const member = message.mentions.members.first();
        if (!member) return message.reply("Please mention a user to ban.");

        try {
            await member.ban();
            message.reply(✅ Successfully banned ${member.user.tag});
        } catch (err) {
            message.reply("I couldn't ban that user. Do I have the right permissions?");
        }
    }
});
*/
client.login(token);
