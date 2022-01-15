const keepAlive = require('./util/keep_alive');
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_VOICE_STATES", "GUILD_PRESENCES", "GUILD_MESSAGES", "DIRECT_MESSAGES"] })

//https://discord.com/api/webhooks/[id]/[token]
const webhook = new Discord.WebhookClient({
    id: "",
    token: ""
})
const token = "bot token";

client.on('ready', function () {
    client.user.setActivity(`some music`, { type: 'LISTENING' });
});

client.on("messageDelete", function (message) {
  if (message.content.length != 0) {
    let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username + "#" + message.author.discriminator)
        .setDescription(`❌ Message deleted in ${message.channel}`)
        .addField("**Content**", message.content)
        .setTimestamp()
        .setFooter("Message ID: " + message.id);

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
            .setTimestamp()
            .setFooter("Message ID: " + newMessage.id);

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

client.on("roleDelete", function (role) {
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

client.on('guildBanAdd', (ban) => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`❌ Baned user ${ban.user}`)
        .setTimestamp()
        .setFooter("User ID: " + ban.user.id);

    webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on('guildBanRemove', (ban) => {
    let embed = new Discord.MessageEmbed()
        .setDescription(`✅ Unbaned user ${ban.user}`)
        .setTimestamp()
        .setFooter("User ID: " + ban.user.id);

    webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on("roleCreate", function (role) {
    let embed = new Discord.MessageEmbed()
        .setDescription(`✅ Role created`)
        .addField("**Name**", role.name, true)
        .setTimestamp()
        .setFooter("Role ID: " + role.id);

    webhook.send({ embeds: [embed] }).catch(console.error);
});

client.on("roleDelete", function (role) {
    let embed = new Discord.MessageEmbed()
        .setDescription(`❌ Role deleted`)
        .addField("**Name**", role.name, true)
        .setTimestamp()
        .setFooter("Role ID: " + role.id);

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

client.login(token)