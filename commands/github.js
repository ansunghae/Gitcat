module.exports = {
    name : "github",
    description : "github",
    execute(message) {
        const Discord = require("discord.js");
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
                const arg = message.content.split(' ').slice(1);
                const amount = arg.join(' ')
                if(!arg[0]){
                    const embed = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle("ERROR")
                    .setDescription("유저이름을 입력해주세요.")
                    return message.channel.send({embeds:[embed]})
                }
                let checkstring=/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i
                if(!checkstring.test(amount)){
                    const embed = new Discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle("ERROR")
                    .setDescription("유저이름에는 특수문자 또는 한글이 들어갈 수 없습니다.")
                    return message.channel.send({embeds:[embed]})
                }else{
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
                    console.log(responseData.login+"님을 조회했습니다.")
                    const gitembed = new Discord.MessageEmbed()
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
                    return message.channel.send({embeds : [gitembed]})
                };
                      if(request.readyState == 4 && request.status == 404){
                      console.log("찾을 수 없는 유저를 조회했습니다.")
                      const embed1 = new Discord.MessageEmbed()
                      .setColor("#FF0000")
                      .setTitle("⛔ ERROR")
                      .setDescription("유저를 찾을 수 없습니다.")
                      return message.channel.send({embeds : [embed1]})
                  };
                };
            }
        }}