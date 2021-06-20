const Discord = require('discord.js');
const bot = new Discord.Client();

const fs = require('fs');

const editJsonFile = require("edit-json-file");

const filter = require('filter-array');

//// Token \\\\
const tokJson = require('./token.json');
const token = tokJson.token;

//// Config \\\\
const conJson = require('./config.json');


const prefix = conJson.prefix;
const adminID = conJson.adminRole;

// Admin Cmds \\
const kickCmd = conJson.kickCmd;
const banCmd = conJson.banCmd;
const purgeCmd = conJson.purgeCmd;
const muteChannelCmd = conJson.muteChannelCmd;
const unmuteChannelCmd = conJson.unmuteChannelCmd;
const muteUserCmd = conJson.muteUserCmd;
const embedCmd = conJson.embedCmd;

// Logs \\
const doLogs = conJson.doLogs;
const logChannelID = conJson.logChannelID;

const logColor = conJson.logColor;

const msgLogs = conJson.msgLogs;
const delMsgLogs = conJson.delMsgLogs;
const editMsgLogs = conJson.editMsgLogs;
const addChannelLogs = conJson.addChannelLogs;
const editChannelLogs = conJson.editChannelLogs;
const removeChannelLogs = conJson.removeChannelLogs;
const addRoleLogs = conJson.addRoleLogs;
const editRoleLogs = conJson.editRoleLogs;
const removeRoleLogs = conJson.removeRoleLogs;
const joinLogs = conJson.joinLogs;
const leaveLogs = conJson.leaveLogs;
const changeStatusCmd = conJson.changeStatusCmd;

// Channel Mute Config \\
const channelMuteMsgColor = conJson.channelMuteMsgColor;

//// Channels Muted \\\\
var channel1 = 'None';
var channel2 = 'None';
var channel3 = 'None';
var channel4 = 'None';
var channel5 = 'None';
var channel6 = 'None';
var channel7 = 'None';
var channel8 = 'None';
var channel9 = 'None';
var channel10 = 'None';

//// Welcome and Leave Config \\\\

const welcomeMsg = conJson.welcomeMsg;
const welcomeChannel =  conJson.welcomeChannel;

const leaveMsg = conJson.leaveMsg;
const leaveChannel = conJson.leaveChannel;

//// Status Config \\\\

const useStatus = conJson.useStatus;
const botStatus = conJson.botStatus;

bot.on('ready', () => {
    console.log('Online');

    if(useStatus == true) {
        bot.user.setStatus("STREAMING");
        bot.user.setActivity(botStatus, { type : "STREAMING", url : 'https://discord.gg/SuhsYNy5bh'});
    }
    
})

//// Welcome and Leave \\\\

bot.on('guildMemberAdd', (member) => {
    if(joinLogs == true) {
        log('<@' + member.id + '> has Joined');
    }

    console.log('Working');

    if(welcomeMsg == true) {
        welcomeMsgChannel = bot.channels.cache.find(channel => channel.id === welcomeChannel);
        welcomeMsgChannel.send('<@' + member.id + '> Welcome to Salient Bots');
    }
});

bot.on('guildMemberRemove', (member) => {
    if(leaveLogs == true) {
        log('<@' + member.id + '> has Joined');
    }

    console.log('Working');

    if(leaveMsg == true) {
        leaveMsgChannel = bot.channels.cache.find(channel => channel.id === leaveChannel);
        leaveMsgChannel.send('Good bye, <@' + member.id + '> have a good one.');
    }
});

bot.on('message', msg => {
    //// Variables \\\\
    const args = msg.content.slice(prefix.length).trim().split(' ');

    let channelsMutedJson = editJsonFile('./channelsMuted.json');

    //// Admin Commands \\\\
    if(msg.content.startsWith(prefix + kickCmd)) {
        if(msg.member.roles.cache.find(r => r.id === adminID)) {
            msg.mentions.members.first().kick();
            log('<@' + msg.mentions.members.first() + '> was Kicked by <@' + msg.author.id + '>');
        } else {
            msg.channel.send('You do not have the permissions to do this command.');
            log('<@' + msg.author.id + '> Tried to kick <@' + msg.mentions.members.first() + '>');
            if(err) {
                msg.channel.send('Something went wrong, please check your command again and make sure you put it in right. If everything looks to be fine please contact a Dev.');
            }
        }
    }

    if(msg.content.startsWith(prefix + banCmd)) {
        if(msg.member.roles.cache.find(r => r.id === adminID)) {
            msg.mentions.members.first().ban();
            log('<@' + msg.mentions.members.first() + '> was Banned by <@' + msg.author.id + '>');
        } else {
            msg.channel.send('You do not have the permissions to do this command.');
            log('<@' + msg.author.id + '> Tried to kick <@' + msg.mentions.members.first() + '>');
            if(err) {
                msg.channel.send('Something went wrong, please check your command again and make sure you put it in right. If everything looks to be fine please contact a Dev.');
            }
        }
    }

    if(msg.content.startsWith(prefix + purgeCmd)) {
        if(msg.member.roles.cache.find(r => r.id === adminID)) {
            purgeNum = args[1];
            msg.channel.bulkDelete(purgeNum);
            log('<@' + msg.author.id + '> Deleted ' + purgeNum + ' from <#' + msg.channel.id + '>');
            msg.channel.send(purgeNum + ' deleted. [This message will delete in 5 seconds]')
            setTimeout(function() {msg.channel.bulkDelete(1)}, 5000)
            msg.channel.bulkDelete(1);
            
        } else {
            msg.channel.send('You do not have permissions to do this command.');
            log('<@' + msg.author.id + '> Tried to delete ' + purgeNum + ' from <#' + msg.channel.id + '>');
            if(err) {
                msg.channel.send('Something went wrong, please check your command again and make sure you put it in right. If everything looks to be fine please contact a Dev.');
            }
        }
    }

    if(msg.content.startsWith(prefix + muteChannelCmd)) {
        if(msg.member.roles.cache.find(r => r.id === adminID)) {
            if(channel1 !== msg.channel.id && channel2 !== msg.channel.id && channel3 !== msg.channel.id && channel4 !== msg.channel.id && channel5 !== msg.channel.id && channel6 !== msg.channel.id && channel7 !== msg.channel.id && channel8 !== msg.channel.id && channel9 !== msg.channel.id && channel10 !== msg.channel.id) {
                if(channel1 == 'None') {
                    channel1 = msg.channel.id;
                    channelLock(msg, channelsMutedJson);
                } else {
                    if(channel2 == 'None') {
                        channel2 = msg.channel.id;
                        channelLock(msg, channelsMutedJson);
                    } else {
                        if(channel3 == 'None') {
                            channel3 = msg.channel.id;
                            channelLock(msg, channelsMutedJson);
                        } else {
                            if(channel4 == 'None') {
                                channel4 = msg.channel.id;
                                channelLock(msg, channelsMutedJson);
                            } else {
                                if(channel5 == 'None') {
                                    channel5 = msg.channel.id;
                                    channelLock(msg, channelsMutedJson);
                                } else {
                                    if(channel6 == 'None') {
                                        channel6 = msg.channel.id;
                                        channelLock(msg, channelsMutedJson);
                                    } else {
                                        if(channel7 == 'None') {
                                            channel7 = msg.channel.id;
                                            channelLock(msg, channelsMutedJson);
                                        } else {
                                            if(channel8 == 'None') {
                                                channel8 = msg.channel.id;
                                                channelLock(msg, channelsMutedJson);
                                            } else {
                                                if(channel9 == 'None') {
                                                    channel9 = msg.channel.id;
                                                    channelLock(msg, channelsMutedJson);
                                                } else {
                                                    if(channel10 == 'None') {
                                                        channel10 = msg.channel.id;
                                                        channelLock(msg, channelsMutedJson);
                                                    } else {
                                                        msg.channel.send('All Filled');
                                                    }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        } else {
            msg.channel.send('Channel is already Locked');
        }
    }

    if(msg.content.startsWith(prefix + unmuteChannelCmd)) {
        if(msg.member.roles.cache.find(r => r.id === adminID)) {
            if(channel1 == msg.channel.id) {
                channel1 = 'None';
                msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                msg.channel.send('Channel has been unmuted.');
                log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
            } else {
                if(channel2 == msg.channel.id) {
                    channel2 = 'None';
                    msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                    msg.channel.send('Channel has been unmuted.');
                    log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
                } else {
                    if(channel3 == msg.channel.id) {
                        channel3 = 'None';
                        msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                        msg.channel.send('Channel has been unmuted.');
                        log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
                    } else {
                        if(channel4 == msg.channel.id) {
                            channel4 = 'None';
                            msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                            msg.channel.send('Channel has been unmuted.');
                            log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
                        } else {
                            if(channel5 == msg.channel.id) {
                                channel5 = 'None';
                                msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                                msg.channel.send('Channel has been unmuted.');
                                log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
                            } else {
                                if(channel6 == msg.channel.id) {
                                    channel6 = 'None';
                                    msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                                    msg.channel.send('Channel has been unmuted.');
                                    log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
                                } else {
                                    if(channel7 == msg.channel.id) {
                                        channel7 = 'None';
                                        msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                                        msg.channel.send('Channel has been unmuted.');
                                        log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
                                    } else {
                                        if(channel8 == msg.channel.id) {
                                            channel8 = 'None';
                                            msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                                            msg.channel.send('Channel has been unmuted.');
                                            log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
                                        } else {
                                            if(channel9 == msg.channel.id) {
                                                channel9 = 'None';
                                                msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                                                msg.channel.send('Channel has been unmuted.');
                                                log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
                                            } else {
                                                if(channel10 == msg.channel.id) {
                                                    channel10 = 'None';
                                                    msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: true });
                                                    msg.channel.send('Channel has been unmuted.');
                                                    log('<#' + msg.channel.id + '> was unmuted by <@' + msg.member.id + '>');
                                                } else {
                                                    msg.channel.send('Channel is not Muted.');
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if(msg.content.startsWith(prefix + muteUserCmd)) {
        if(msg.member.roles.cache.find(r => r.id === adminID)) {
            if(msg.member.hasPermission('SEND_MESSAGES')) {
                msg.channel.updateOverwrite(msg.mentions.members.first(), { SEND_MESSAGES: true});
            } else {
                msg.channel.updateOverwrite(msg.mentions.members.first(), { SEND_MESSAGES: false});
            }
        }
    }

    if(msg.content.startsWith(prefix + embedCmd)) {
        if(msg.member.roles.cache.find(r => r.id === adminID)) {
            const embedMsg = new Discord.MessageEmbed()
                .setColor(logColor)
                .setTitle('Salient Bots')
                .setURL('https://google.com/')
                .setDescription(args.slice(1).join(' '));
            msg.channel.bulkDelete(1);
            msg.channel.send(embedMsg);
            log('<@' + msg.member.id + '> send a embed message saying ' + args.slice(1).join(' '));
        }
    }

    if(msg.content.startsWith(prefix + changeStatusCmd)) {
        if(msg.member.roles.cache.find(r => r.id === adminID)) {
            bot.user.setActivity(args.slice(1).join(' '), { type : "STREAMING", url : 'https://discord.gg/SuhsYNy5bh'});
        }
    }

    //// Logs \\\\

    // Message Logs \\
    if(msg.channel.id !== logChannelID) {
        if(msgLogs == true) {
            log('<@' + msg.member.id + '> send a message in <#' + msg.channel.id + '>\nMessage: ' + msg.content);
        }
    }
});

bot.on("messageDelete", (messageDelete) => {
    if(delMsgLogs == true) {
        log('<@' + messageDelete.member.id + '> deleted a message in <#' + messageDelete.channel.id + '>\nMessage: ' + messageDelete.content);
    }
});

bot.on('messageUpdate', (oldMessage, newMessage) => {
    if(editMsgLogs == true) {
        log('<@' + newMessage.member.id + '> edited a message in <#' + oldMessage.channel.id + '>\nOld Message: ' + oldMessage.content + '\nNew Message: ' + newMessage.content);
    }
});

// Logging Channels \\

bot.on('channelCreate', (channel) => {
    if(addChannelLogs == true) {
        log('New channel was maded.\nChannel Name: <#' + channel + '>')
    }
})

bot.on('channelDelete', (channel) => {
    if(removeChannelLogs == true) {
        log('Channel was deleted.');
    }
});

bot.on('channelUpdate', (oldChannel, newChannel) => {
    if(editChannelLogs == true) {
        log('<#' + newChannel.id + '> was edited.');
    }
});

// Role Logs \\
bot.on('roleCreate', (role) => {
    if(addRoleLogs == true) {
        log('Role was maded.\nRole Maded: <@&' + role.id + '>')
    }
})

bot.on('roleDelete', (role) => {
    if(removeRoleLogs == true) {
        log('Role was deleted.')
    }
})

bot.on('roleUpdate', (oldRole, newRole) => {
    if(removeRoleLogs == true) {
        log('Role was updated.\nOld Role Name: ' + oldRole.name + '\nNew Role Name: ' + newRole.name)
    }
});

//// Functions \\\\
function log(messag) {
    const logChannel = bot.channels.cache.find(channel => channel.id === logChannelID);
    const logEmbed = new Discord.MessageEmbed()
        .setColor(logColor)
        .setTitle('Salient Bots Logs')
        .setURL('https://google.com/')
        .setDescription(messag);
    logChannel.send(logEmbed);
}

function channelLock(msg, channelsMutedJson) {
    const args = msg.content.slice(prefix.length).trim().split(' ');

    if(msg.member.roles.cache.find(r => r.id === adminID)) {
        msg.channel.updateOverwrite(msg.guild.roles.everyone.id, { SEND_MESSAGES: false });
        msg.channel.bulkDelete(1);
        currentChannel = msg.channel.name;
            
        if(args.slice(1).join(' ') == '') {
            const channelMuteMessage = new Discord.MessageEmbed()
                .setColor(channelMuteMsgColor)
                .setTitle('Channel Locked')
                .setURL('https://google.com/')
                .setDescription('This channel has been Locked by a Admin please wait for the channel to be unlocked.')
            msg.channel.send(channelMuteMessage);
            log('<#' + msg.channel.id + '> was Locked by ' + msg.author.username);
        } else {
            const channelMuteMessage = new Discord.MessageEmbed()
                .setColor(channelMuteMsgColor)
                .setTitle('Channel Locked')
                .setURL('https://google.com/')
                .setDescription('This channel has been Locked by a Admin please wait for the channel to be unlocked. The reason for the channel being locked: ' + args.slice(1).join(' '))
            msg.channel.send(channelMuteMessage);
            log('<#' + msg.channel.id + '> was Locked by ' + msg.author.username + ', it was locked for the reason: ' + args.slice(1).join(' '));
        }
    }
}

bot.login(process.env.token);