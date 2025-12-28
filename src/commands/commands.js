
const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("../../config.json");

const initCommands = (client) => {
  const commandFolders = fs.readdirSync(__dirname).filter(f => fs.statSync(path.join(__dirname, f)).isDirectory());

  const commands = [];

  for (const folder of commandFolders) {
    const commandsPath = path.join(__dirname, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      } else {
        console.log(`[WARN] The command at ${filePath} is miss required "data" or "execute" property.`);
      }
    }
  }

  const rest = new REST().setToken(token);

  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands`);

      /*const data = await rest.put(
        Routes.applicationGuildCommands(clientId, guildId),
        { body: commands },
      );*/

      const data = await rest.put(
        Routes.applicationCommands(clientId),
        { body: commands },
      );

      console.log(`Successfully reloaded ${commands.length} application (/) commands`);      
    } catch (err) {
      console.error(error);
    }
  })();

}
 
module.exports = initCommands;