module.exports = {
    name : "dev",
    description : "dev",
    execute(message) {
        const Discord = require("discord.js");
        const gitembed = new Discord.MessageEmbed()
        .setColor('#f7ff9c')
        .setTitle('πGitCat dev')
        .addFields(
        { name: 'γγ#1059', value: 'μ΄κ°λ°μ'},
        { name: 'μ γγ΄#2196', value: 'κ°λ°μ'}
        )

        return message.channel.send({embeds : [gitembed]})
}};