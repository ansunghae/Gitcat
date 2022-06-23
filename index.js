// 모듈, 설정파일 불러오기
const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Interaction } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require('./source/config.json'); // 상태메시지, 접두사 불러오는 용도
const package = require('./package.json'); //버전 등 불러오는 용도
// const { token } = require('./source/token.json')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

// 봇 세팅알림, 봇 상태설정
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`); // 로그인 알림
    client.user.setActivity(config.activity + package.version, { type: 'PLAYING' }); //상태메시지 설정
    const gembed = new MessageEmbed()
        .setColor('#f7ff9c')
        .setTitle('📢 봇구동 안내')
        .addFields(
            { name: '봇이 구동되었습니다.',value:'모든명령어가 정상적으로 작동합니다.'}
        )
    client.channels.cache.get('974953260072976427').send({embeds : [gembed]})

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
            { name: 'Command', value: '**g.help** -- 이 명령어 모음을 출력합니다.\n**g.github {username}** -- 깃허브를 조회합니다.\n**g.support** -- Gitcat의 서포트서버로 이동합니다.'}
        )

        message.channel.send({embeds : [gitembed]})
    }

    if (message.content.toLowerCase().startsWith(config.prefix+"github")) {
        if (message.content===config.prefix+"github"){
            message.channel.send("유저이름을 입력해주세요.")
        }else{
            const arg = message.content.split(' ').slice(1);
            const amount = arg.join(' ')
            var request = new XMLHttpRequest();
            request.open('GET', 'https://api.github.com/users/'+amount, 'true')
            request.send()
            request.onreadystatechange = function(event){
            if(request.readyState == 4 && request.status == 200){
                const responseData = JSON.parse(request.responseText)
                
                Object.keys(responseData).forEach(key => {
                    if(responseData[key]===null || responseData[key]===''){
                        responseData[key] = '-';
                    }
                    if(typeof(responseData[key])!=String){
                        responseData[key].toString
                    }
                });
                var crtime = responseData.created_at
                var arr = crtime.split('T')
                if(responseData['name']==='-') responseData['name'] = responseData.login
                console.log(responseData)
                const gitembed = new MessageEmbed()
                .setURL('https://github.com/'+responseData.login)
                .setColor("#f7ff9c")
                .setTitle("Github Info")
                .setThumbnail(responseData.avatar_url)
                .addFields(
                    { name: 'Username', value: responseData.name, inline: true},
                    { name: 'Bio', value: responseData.bio, inline: true},
                    { name: 'Company', value:responseData.company, inline: true },
                    { name : "Created Account", value:arr[0] , inline: true },
                )
                message.channel.send({embeds : [gitembed]})
            };
            };
        }
    }

    if(message.content === config.prefix+'support') {
        const gitembed = new MessageEmbed()
        .setColor('#f7ff9c')
        .setURL('https://discord.gg/9wmZYw2H8Q')
        .setTitle('📌GitCat Support Server')

        message.channel.send({embeds : [gitembed]})
    }
    
    if(message.content === config.prefix+'hellothisisverification') {
        message.channel.send('ㅅㅎ#1059(442122750400921601)')
    }

});
// 봇 로그인 및 구동
client.login(process.env.TOKEN);
