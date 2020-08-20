
/**
 * Send a user a link to their avatar
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('Listo Onii chan!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "what is my avatar"
  if (message.content === ',avatar') {
    // Send the user's avatar URL
    const avatarEmbed = new Discord.MessageEmbed()
    .setColor('#fff700')
    .setTitle(message.author.username)
    .setImage(message.author.displayAvatarURL());

    message.channel.send(avatarEmbed);
    //message.channel.send("Aca esta tu hermoso Perfil");
    //message.reply(message.author.displayAvatarURL());
  }








  if (message.content.startsWith(',duelo')) {
    if(message.mentions.users.size > 0){
      if(message.mentions.users.first().id === client.user.id){
        message.channel.send('No aceptaré el reto porque no hay duda de que yo te ganaría uwu');
      }else{
        console.log(message.mentions);
        message.react('✅');
        message.react('❌');

        const filter = (reaction, user) => {
          return ['✅', '❌'].includes(reaction.emoji.name) && user.id === message.mentions.users.first().id;
        };
        
        message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
          .then(collected => {
          const reaction = collected.first();
          if (reaction.emoji.name === '✅') {
            PerformDuel(message.channel, message.author.id, message.mentions.users.first().id);
          }else{
            message.channel.send('Onii chan <@' + message.mentions.users.first().id + '> es un marica y se fue corriendo.');
          }
        });
      }
    }else{
      message.channel.send('No seas imbecil onii chan, debes mencionar a alguien uwu');
    }
  }
});

function PerformDuel(message_channel, challenger_id, against_id){
  var prob = Math.random();
  var winner;
  if(prob < 0.5){
    winner = challenger_id;
  }else{
    winner = against_id;
  }
  console.log('prob=' + prob.toString());
  //message.channel.send('`prob=`' + prob.toString());
  message_channel.send('Omedetto <@' + winner + '> ganaste el duelo uwu');
}
//<@' + message.mentions.users[0].id + '>
// Log our bot in using the token from https://discord.com/developers/applications
client.login('NzQ1NDgzOTc4MjM1OTY5NjM3.XzycDg.UMZkuBIAHkf5QkhzKDQYV56-CoE');