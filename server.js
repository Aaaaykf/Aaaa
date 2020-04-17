const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://test-store-bc.glitch.me/`);
}, 280000);

// كل البكجات الي ممكن تحتجها في اي بوت 
const { Client, RichEmbed } = require("discord.js");
var { Util } = require('discord.js');
const {TOKEN, YT_API_KEY, prefix, devs} = require('./config')
const client = new Client({ disableEveryone: true})
const ytdl = require("ytdl-core");
const canvas = require("canvas");
const Canvas = require("canvas");
const convert = require("hh-mm-ss")
const fetchVideoInfo = require("youtube-info");
const botversion = require('./package.json').version;
const simpleytapi = require('simple-youtube-api')
const moment = require("moment");
const fs = require('fs');
const util = require("util")
const gif = require("gif-search");
const opus = require("node-opus");
const ms = require("ms");
const jimp = require("jimp");
const { get } = require('snekfetch');
const guild = require('guild');
const dateFormat = require('dateformat');//npm i dateformat
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAdORXg7UZUo7sePv97JyoDqtQVi3Ll0b8');
const hastebins = require('hastebin-gen');
const getYoutubeID = require('get-youtube-id');
const yt_api_key = "AIzaSyDeoIH0u1e72AtfpwSKKOSy3IPp2UHzqi4";
const pretty = require("pretty-ms");
client.login(TOKEN);
const queue = new Map();
var table = require('table').table
const Discord = require('discord.js');
client.on('ready', () => { 
  console.log(`Logged in as ${client.user.tag}!`);
  
});
 

 //كود برودكاست

client.on("message", async message => {
  if (!message.guild || message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "bc")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    if (message.guild.inter == true) return message.reply ('**Another broadcast is running please wait while it finishes.**')
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!args) return message.channel
      .send(
        ">>> **[1] جميع الاعضاء\n[2] الاعضاء المتصلين\n[3] الرتب الخاصة\n[0] الغاء الأمر**"
      )
      .then(m => {
        message.channel
          .awaitMessages(msg => msg.author.id === message.author.id, {
            max: 1,
            time: 1000 * 60 * 2,
            errors: ["time"]
          })
          .then(async (c) => {
          var members = null;
            if (c.first().content === "1") {
              members = message.guild.members.array ();
              c.first().delete();
              m.delete();
            }
            if (c.first().content === "2") {
              members = message.guild.members
                .filter(m => m.presence.status !== "offline").array();

              c.first().delete();
              m.delete();
            }
            if (c.first().content == "0") {
              c.first().delete();
              m.delete();
              message.channel.send("**تم الغاء الامر بنجاح**");
            }
            if (c.first().content === "3") {
              m.edit("**>>> ادخل اسم الرتبة من فضلك**").then(ms => {
                message.channel
                  .awaitMessages(msg => msg.author.id === message.author.id, {
                    max: 1,
                    time: 1000 * 60 * 2,
                    errors: ["time"]
                  })
                  .then(c => {
                    let role = message.guild.roles.find(
                      role => role.name === c.first().content
                    );
                    if (!role)
                      return message.channel
                        .send("**:x: لا استطيع العثور على الرتبة الخاصة بالرسالة**")
                        .then(() => {
                          ms.delete();
                          c.first().delete();
                        });
                    let roleID = role.id;
                    members = message.guild.roles.get(roleID).members.array();
                    c.first().delete();
                    m.delete();
                  });
              });
            }
          
          if (members == null) return message.reply ('**No Member found.**');
          else {
            const msg = await message.channel.send (`Sending to ${members.length} members...`)
            var count = 0;
            var ycount = 0;
            var xcount = 0;
            message.guild.interval = await setInterval (() => {
              if (!members [count]) {
                clearInterval (message.guild.inter);
                msg.edit (new Discord.RichEmbed().setDescription(`Successfully sent the broadcast to ${ycount} members\nand i couldn't send the broadcast to ${xcount} members.`).setTimestamp());
                message.guild.inter = true;
              } else {
                members [count].send (`<@${members[count].user.id}>\n${args}`).then (() => {
                  ycount++;
                }).catch (err => {
                  return xcount++;
                });
              }
              count++;
            }, 500)
          }
          })
          .catch(() => m.delete());
      });
  } else if (message.content.startsWith(prefix + "setname")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "279557901922729984") return;
    client.user.setUsername(args);
    message.channel.send(`تم تغيير الاسم الى ..**${args}** `);
  } else if (message.content.startsWith(prefix + "setavatar")) {
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ");
    if (!message.author.id === "279557901922729984") return;
    client.user.setAvatar(args).catch(err => message.reply("send a valid url"));
    message.channel.send(`تم تغيير الصورة الى :**${args}** `);
  }
});

///تغير الحالة

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
client.on("ready", () => {
  client.user.setStatus("idle");
});
client.on("ready", () => {
  client.user.setActivity(`${prefix}bc Test Store`, { type: "WATCHING" });
});

//اختصارات للاوامر
//بلاينق ، $pl هنا اللي تبي ينكتب
//ستريمنق ، $st هنا اللي تبي ينكتب
//لسنق ، $ls هنا اللي تبي ينكتب
//ويتشنق ، $wt هنا اللي تبي ينكتب

