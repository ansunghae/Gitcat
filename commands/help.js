module.exports = {
    name : "help",
    description : "Help",
    execute(message) {
        const Discord = require("discord.js");
        const gitembed = new Discord.MessageEmbed()
        .setColor('#f7ff9c')
        .setTitle('📌GitCat Help')
        .addFields(
        { name: 'Command', value: '**g.help** -- 이 명령어 모음을 출력합니다.\n**g.github {username}** -- 깃허브를 조회합니다.\n**g.support** -- Gitcat의 서포트서버로 이동합니다.\n**g.report** -- 건의사항을 개발자에게 전송합니다.'}
        )

        return message.channel.send({embeds : [gitembed]})
}};