module.exports = {
    name : "dev",
    description : "dev",
    execute(message) {
        const Discord = require("discord.js");
        const gitembed = new Discord.MessageEmbed()
        .setColor('#f7ff9c')
        .setTitle('📌GitCat dev')
        .addFields(
        { name: 'ㅅㅎ#1059', value: '총개발자'},
        { name: '정ㅈㄴ#2196', value: '개발자'}
        )

        return message.channel.send({embeds : [gitembed]})
}};