module.exports = {
    name : "support",
    description : "support",
    execute(message) {
        const Discord = require("discord.js");
        const embed = new Discord.MessageEmbed()
        .setColor('#f7ff9c')
        .setURL('https://discord.gg/9wmZYw2H8Q')
        .setTitle('📌GitCat Support Server')
        return message.channel.send({embeds : [embed]})
    }
}