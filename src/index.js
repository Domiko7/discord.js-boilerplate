
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

client.login(token);
