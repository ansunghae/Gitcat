// 모듈, 설정파일 불러오기
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./source/config.json'); // 상태메시지, 접두사 불러오는 용도
const package = require('./package.json'); //버전 등 불러오는 용도
const { token } = require('./source/token.json')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// 봇 세팅알림, 봇 상태설정
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); // 로그인 알림
    client.user.setActivity(config.activity + package.version, { type: 'PLAYING' }); //상태메시지 설정
  });

// 봇 명령어
client.on('messageCreate', message => {

    // if(message.content === config.prefix+'git') {
    //     const gitembed = new MessageEmbed()
    //     .setColor('#ff9999')
    //     .setTitle('Github Commit Chart')
    //     .setImage("https://ghchart.rshah.org/ansunghae")

    //     message.channel.send({embeds : [gitembed]})
    // }


    if(message.content === config.prefix+'help') {
        const gitembed = new MessageEmbed()
        .setColor('#f7ff9c')
        .setTitle('📌GitCat Help')
        .addFields(
            { name: 'Command', value: '**g.help** -- 이 명령어 모음을 출력합니다.\n**g.github** -- 깃허브를 조회합니다.'}
        )

        message.channel.send({embeds : [gitembed]})
    }


    if(message.content === config.prefix+'github') {

        var request = new XMLHttpRequest();
        request.open('GET', 'https://api.github.com/users/ansunghae', 'true')
        request.send()
        request.onreadystatechange = function(event){
            if(request.readyState == 4 && request.status == 200){
                const responseData = request.responseText
                console.log(responseData.login)
            };
        };


    };

    
});

// 봇 로그인 및 구동
client.login(token)