const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "DIRECT_MESSAGES"] })

//https://discord.com/api/webhooks/[id]/[token]
const webhook = new Discord.WebhookClient({
  id: '',
  token: ''
})

client.on('ready', function() {
  client.user.setActivity(`some music`, { type: 'LISTENING' });
});

client.on("messageDelete", function(message) {
  if (message.content.length != 0) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(message.author.username + "#" + zmessage.author.discriminator)
      .setDescription(`❌ Message deleted in ${message.channel}`)
      .addField("**Content**", message.content)
      .setFooter("Message ID: " + message.id)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }
});

client.on('messageUpdate', (oldMessage, newMessage) => {
  if (oldMessage.content != newMessage.content) {
    let embed = new Discord.MessageEmbed()
      .setAuthor(newMessage.author.tag, newMessage.author.avatarURL)
      .setDescription(`📖 Message edited in ${oldMessage.channel}`)
      .addField("**Before**", oldMessage.content)
      .addField("**After**", newMessage.content)
      .setFooter("Message ID: " + newMessage.id)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }
});

client.on('channelCreate', (channel) => {
  let embed = new Discord.MessageEmbed()
    .setDescription(`✅ Channel created ${channel}`)
    .addField("**Name**", channel.name, true)
    .addField("**ID**", channel.id, true)
    .setTimestamp();

  webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on('channelDelete', (channel) => {
  let embed = new Discord.MessageEmbed()
    .setDescription(`❌ Channel deleted`)
    .addField("**Name**", channel.name, true)
    .addField("**ID**", channel.id, true)
    .setTimestamp();

  webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on('channelUpdate', (oldChannel, newChannel) => {
  if (oldChannel.name != newChannel.name) {
    let embed = new Discord.MessageEmbed()
      .setDescription(`📕 ${newChannel} name changed`)
      .addField("**Before**", oldChannel.name)
      .addField("**After**", newChannel.name)
      .setFooter("Channel ID: " + newChannel.id)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }
  
  if (oldChannel.bitrate != newChannel.bitrate) {
    let embed = new Discord.MessageEmbed()
      .setDescription(`📕 ${newChannel} bitrate changed`)
      .addField("**Before**", oldChannel.bitrate.toString().replace('000', '') + "kbps")
      .addField("**After**", newChannel.bitrate.toString().replace('000', '') + "kbps")
      .setFooter("Channel ID: " + newChannel.id)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }
});

client.on("roleDelete", function(role) {
  let embed = new Discord.MessageEmbed()
    .setDescription(`❌ Role deleted`)
    .addField("**Name**", role.name, true)
    .addField("**ID**", role.id, true)
    .setTimestamp();

  webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on('guildMemberAdd', (member) => {
  let embed = new Discord.MessageEmbed()
    .setDescription(`✅ User joined ${member.user}`)
    .addField("**Name**", member.user.username, true)
    .addField("**ID**", member.user.id, true)
    .setTimestamp();

  webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on('guildMemberRemove', (member) => {
  let embed = new Discord.MessageEmbed()
    .setDescription(`❌ User leaved ${member.user}`)
    .addField("**Name**", member.user.username, true)
    .addField("**ID**", member.user.id, true)
    .setTimestamp();

  webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (!oldMember.nickname && newMember.nickname) {
    let embed = new Discord.MessageEmbed()
      .setDescription(`📕 ${newMember.user} nickname added`)
      .addField("**New nickname**", newMember.nickname, true)
      .setFooter("User ID: " + newMember.id)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }
  if (oldMember.nickname && !newMember.nickname) {
    let embed = new Discord.MessageEmbed()
      .setDescription(`📕 ${oldMember.user} nickname removed`)
      .addField("**Old nickname**", oldMember.nickname, true)
      .setFooter("User ID: " + newMember.id)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }
  if (oldMember.nickname && newMember.nickname) {
    let embed = new Discord.MessageEmbed()
      .setDescription(`📕 ${newMember.user} nickname changed`)
      .addField("**Before**", oldMember.nickname)
      .addField("**After**", newMember.nickname)
      .setFooter("User ID: " + newMember.id)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }

  if (oldMember.roles.cache.size != newMember.roles.cache.size) {
    let embed = new Discord.MessageEmbed()
      .setDescription(`📕 ${newMember.user} roles changed`)
      .setFooter("User ID: " + newMember.id)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }
});

client.on('guildBanAdd', (ban) => {
  let embed = new Discord.MessageEmbed()
    .setDescription(`❌ Baned user ${ban.user}`)
    .setFooter("User ID: " + ban.user.id)
    .setTimestamp();

  webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on('guildBanRemove', (ban) => {
  let embed = new Discord.MessageEmbed()
    .setDescription(`✅ Unbaned user ${ban.user}`)
    .setFooter("User ID: " + ban.user.id)
    .setTimestamp();

  webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on('voiceStateUpdate', (oldState, newState) => {

  let oldChannelName = (oldState.channelId != null && typeof oldState.channelId != undefined) ? client.channels.cache.get(oldState.channelId).name : null;
  let newChannelName = (newState.channelId != null && typeof newState.channelId != undefined) ? client.channels.cache.get(newState.channelId).name : null;
  let oldChannel = (oldState.channelId != null && typeof oldState.channelId != undefined) ? client.channels.cache.get(oldState.channelId) : null;
  let newChannel = (newState.channelId != null && typeof newState.channelId != undefined) ? client.channels.cache.get(newState.channelId) : null;


  if (oldChannelName === null) {
    let embed = new Discord.MessageEmbed()
      .setDescription(`${oldState.member.user} connected to voice and joined ${newChannel}`)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }
  else if (newChannelName === null) {
    let embed = new Discord.MessageEmbed()
      .setDescription(`${oldState.member.user} disconnected`)
      .setTimestamp();

    webhook.send({ embeds: [embed] }).catch(console.error);
  }
  else {
    if (newState.channelId != oldState.channelId) {
      let embed = new Discord.MessageEmbed()
        .setDescription(`❌ ${oldState.member.user} moved to channel ${newChannel}`)
        .setTimestamp();


      webhook.send({ embeds: [embed] }).catch(console.error);
    }

    if (oldState.serverMute != newState.serverMute) {
      if (newState.serverMute == true) {
        let embed = new Discord.MessageEmbed()
          .setDescription(`❌ ${oldState.member.user} muted in channel ${newChannel}`)
          .setTimestamp();

        webhook.send({ embeds: [embed] }).catch(console.error);
      }

      if (newState.serverMute == false) {
        let embed = new Discord.MessageEmbed()
          .setDescription(`✅ ${oldState.member.user} unmuted in channel ${newChannel}`)
          .setTimestamp();

        webhook.send({ embeds: [embed] }).catch(console.error);
      }
    }

    if (oldState.serverDeaf != newState.serverDeaf) {
      if (newState.serverDeaf == true) {
        let embed = new Discord.MessageEmbed()
          .setDescription(`❌ ${oldState.member.user} deafed in channel ${newChannel}`)
          .setTimestamp();

        webhook.send({ embeds: [embed] }).catch(console.error);
      }

      if (newState.serverDeaf == false) {
        let embed = new Discord.MessageEmbed()
          .setDescription(`✅ ${oldState.member.user} undeafed in channel ${newChannel}`)
          .setTimestamp();

        webhook.send({ embeds: [embed] }).catch(console.error);
      }
    }

  }
});

client.login('TOKEN')
