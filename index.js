const fs = require("fs");
const Discord = require("discord.js");
const { prefix }= require("./source/config.json");
// const { token } = require('./source/token.json')
const package = ('./package.json')
const config = ('./source/config.json')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.DIRECT_MESSAGES]});
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(config.activity+package.version,{ type: 'PLAYING' });
  const gembed = new Discord.MessageEmbed()
  .setColor('#f7ff9c')
  .setTitle('📢 봇구동 안내')
  .addFields(
      { name: '봇이 구동되었습니다.', value:'모든명령어가 정상적으로 작동합니다.'}
  )
  client.channels.cache.get('974953260072976427').send({embeds : [gembed]})
});

client.on('messageCreate', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
  }
});

client.login(process.env.TOKEN);