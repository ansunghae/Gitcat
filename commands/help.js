module.exports = {
    name : "help",
    description : "Help",
    execute(message) {
        const Discord = require("discord.js");
        const gitembed = new Discord.MessageEmbed()
        .setColor('#f7ff9c')
        .setTitle('๐GitCat Help')
        .addFields(
        { name: 'Command', value: '**g.help** -- ์ด ๋ช๋ น์ด ๋ชจ์์ ์ถ๋ ฅํฉ๋๋ค.\n**g.github {username}** -- ๊นํ๋ธ๋ฅผ ์กฐํํฉ๋๋ค.\n**g.support** -- Gitcat์ ์ํฌํธ์๋ฒ๋ก ์ด๋ํฉ๋๋ค.\n**g.dev** -- ๊ฐ๋ฐ์ ๋ชฉ๋ก์ ํ์ธํฉ๋๋ค.\n~~**g.report** -- ๊ฑด์์ฌํญ์ ๊ฐ๋ฐ์์๊ฒ ์ ์กํฉ๋๋ค.~~'}
        )

        return message.channel.send({embeds : [gitembed]})
}};