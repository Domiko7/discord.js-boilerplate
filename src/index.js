const { Client, Events, GatewayIntentBits, Collection, PermissionFlagsBits } = require("discord.js");
const { token } = require("../config.json");
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ] 
});

const initCommands = require("./commands/commands.js");
const prefix = "!";

client.commands = new Collection();
initCommands(client);

client.once(Events.ClientReady, readyClient => {
  console.log(`Ready! Logged in as: ${readyClient.user.tag}`);
});

// --- SLASH COMMAND HANDLER ---
client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (err) {
    console.error(err);
    await interaction.reply({ content: "There was an error with executing this command!", ephemeral: true });
  }
});

// --- PREFIX COMMAND HANDLER ---
/*
client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (commandName === 'ban') {
              if (!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return message.reply("❌ Only Moderators with 'Ban Members' permission can use this.");
        }

        const member = message.mentions.members.first();
        if (!member) return message.reply("Please mention a user to ban.");

        try {
            await member.ban();
            message.reply(`✅ Successfully banned ${member.user.tag}`);
        } catch (err) {
            console.error(err);
            message.reply("I couldn't ban that user. Check my role position and permissions.");
        }
    }
});
*/
client.login(token);
