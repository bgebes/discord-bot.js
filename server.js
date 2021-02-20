const Discord = require("discord.js");
const rgbHex = require("rgb-hex");
const client = new Discord.Client();
const { prefix, token, durum, hedef } = require('./config.json');

const wait = require('util').promisify(setTimeout);

client.on("ready", () => {
  wait(1000);
  console.log(`Logged in as ${client.user.tag}!`);

  if (durum === 1) {
    client.user.setActivity("» bit.ly/teamTurkman «");
  }
});

client.on("guildMemberAdd", guildMember => {
  if (guildMember.guild.name === 'Team Türkman') {
    guildMember.addRole(
      guildMember.guild.roles.find(role => role.name === "🧍 | Takipçi")
    );

    let oyuncu = "<@" + guildMember.id + ">";
    let mevcutkisi = guildMember.guild.members.cache.filter(member => !member.user.bot)
      .size;
    const kanal = guildMember.guild.channels.cache.get("700727786297622548");

    let kalankisi = hedef - mevcutkisi;
    let resim = guildMember.user.avatarURL;
    if (resim === null) {
      resim = "https://i.hizliresim.com/3xhvx7.png";
    }
    let metin;
    if (mevcutkisi < hedef) {
      metin =
        hedef +
        " kişi hedefimize " +
        kalankisi +
        " kişi kaldı!!";
    } else {
      metin = hedef + " kişi hedefimize ulaşmış durumdayız!!";
    }
    let rola = client.guilds.cache
      .get("693515017127067688")
      .roles.find(role => role.name === "🤖 | BOT");
    const embed = {
      title: "Çekilin Yoldan Bir Bela Geliyor!!",
      description: oyuncu + " adlı oyuncu sunucumuza **hoşgeldin!**",
      color: rola.color,
      footer: {
        icon_url: "https://i.hizliresim.com/3xhvx7.png",
        text: metin
      },
      thumbnail: {
        url: resim
      }
    };
    setTimeout(function () {
      kanal.send({ embed }).then(msg => {
        msg.react("✅");
        msg.react("🥳");
        msg.react("🎉");
        msg.react("700834747034763274");
        msg.react("😷");
      });
    }, 1000);
  }
});

client.on("guildMemberRemove", function (guildMember) {
  if (guildMember.guild.name === 'Team Türkman') {
    let oyuncu = "<@" + guildMember.id + ">";
    let mevcutkisi = guildMember.guild.members.cache.filter(member => !member.user.bot)
      .size;
    const kanal = guildMember.guild.channels.cache.get("700727786297622548");

    let kalankisi = hedef - mevcutkisi;
    let resim = guildMember.user.avatarURL;
    if (resim === null) {
      resim = "https://i.hizliresim.com/3xhvx7.png";
    }
    let metin;
    if (mevcutkisi < hedef) {
      metin =
        hedef +
        " kişi hedefimize " +
        kalankisi +
        " kişi kaldı!! 🥳 🎉";
    } else {
      metin = hedef + " kişi hedefimize ulaşmış durumdayız!! 🥳 🎉";
    }

    let rola = client.guilds.cache
      .get("693515017127067688")
      .roles.find(role => role.name === "🤖 | BOT");
    const embed = {
      title: "Rahmetliyi Nasıl Bilirdiniz??",
      description: oyuncu + " adlı oyuncu **görüşmek üzere!!**",
      color: rola.color,
      footer: {
        icon_url: "https://i.hizliresim.com/3xhvx7.png",
        text: metin
      },
      thumbnail: {
        url: resim
      }
    };

    setTimeout(function () {
      kanal.send({ embed }).then(msg => {
        msg.react("❌");
        msg.react("👋");
        msg.react("👎");
      });
    }, 1000);
  }
});

client.on("message", msg => {

  function rndcek(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  if (msg.author.bot) {
    return;
  }

  if (msg.guild.name === 'Team Türkman') {
    let rol = msg.guild.roles.cache.find(role => role.name === "🧍 | Takipçi");
    let ilkbas = rndcek(0, 255);
    let ikincibas = rndcek(0, 255);
    let ucuncubas = rndcek(0, 255);
    let renk = rgbHex(ilkbas, ikincibas, ucuncubas);
    rol.setColor("#" + renk);

    if (
      msg.content.includes("discord.gg") && !msg.author.id === "263395757753761794"
    ) {
      msg.delete({ timeout: 1000, reason: 'It had to be done.' });
      return;
    }

    if (
      msg.content.startsWith(prefix + "ozelodakur") &&
      msg.channel.name === "📞│𝙾da-𝙰cma-𝙺analı"
    ) {
      //
      let parcalar1 = msg.content.split(" ");

      let bilgiparcasi = parcalar1[1];
      let parcalar2 = bilgiparcasi.split(",");
      if (parcalar1.length == 2 && parcalar2.length == 2) {
        let kanalismi = parcalar2[0];
        let kisisayisi = parcalar2[1];

        msg.guild.createChannel(kanalismi, "voice").then(channel => {
          channel.userLimit = kisisayisi;
          channel.setParent("693548336753541120");
        });
      } else {
        msg.reply("Hatalı biçimde giriş yaptınız!").then(msgcik => {
          msgcik.delete({ timeout: 5000, reason: 'It had to be done.' });
        });
      }

      msg.delete({ timeout: 1000, reason: 'It had to be done.' });
    }
    if (
      msg.content === prefix + "cleanup" &&
      msg.author.id === "263395757753761794"
    ) {
      let category = client.guilds.cache
        .get("693515017127067688")
        .channels.cache.get("693548336753541120");
      category.children.cache
        .filter(c => c.type == "voice")
        .forEach(vcChannel =>
          vcChannel.members.map(member =>
            vcChannel.setParent("693553401090539531")
          )
        );

      setTimeout(function () {
        let kanallar = client.guilds.cache
          .get("693515017127067688")
          .channels.cache.filter(
            c => c.type == "voice" && c.parentID == "693548336753541120"
          );
        let kanal = kanallar.map(e => e);
        let i = 0;
        for (i = 0; i < kanal.length; i++) {
          kanal[i].delete();
        }
      }, 2000);

      setTimeout(function () {
        let kanallar = client.guilds.cache
          .get("693515017127067688")
          .channels.cache.filter(
            c => c.type == "voice" && c.parentID == "693553401090539531"
          );
        let kanal = kanallar.map(e => e);
        let i = 0;
        for (i = 0; i < kanal.length; i++) {
          kanal[i].setParent("693548336753541120");
        }
      }, 3000);
    }
    if (msg.content === prefix + "cleanup") {
      try {
        msg.delete({ timeout: 1000, reason: 'It had to be done.' });
      } catch (e) { }
    }
    if (
      msg.content == prefix + "clear" &&
      msg.author.id === "263395757753761794"
    ) {
      async function clear() {
        msg.delete();
        const fetched = await msg.channel.fetchMessages({ limit: 99 });
        msg.channel.bulkDelete(fetched);
      }
      clear();
    }
  }
  else {
    if (msg.content.startsWith(prefix + 'isim')) {
      msg.delete({ timeout: 1000, reason: 'It had to be done.' });

      let gonderen_rolleri = msg.guild.members.cache.get(msg.author.id).roles.cache;
      if (!gonderen_rolleri.some(r => r.name == '💂╏Kayıt Sorumlusu')) {
        return;
      }

      let parcalar = msg.content.split(' ');
      let kullanici_id = parcalar[1].slice(3, -1); //=> <@!809423307644469269> 
      let isim = '', yas = String(parseInt(parcalar[parcalar.length - 1]));
      let sayim = yas == 'NaN' ? parcalar.length : parcalar.length - 1;

      for (let i = 2; i < sayim; i++) {
        isim += parcalar[i].toLocaleLowerCase().replace(parcalar[i][0], parcalar[i][0].toLocaleUpperCase()) + ' ';
      }

      isim = isim.trim();

      let roller = [];
      let kullanici = msg.guild.members.cache.get(kullanici_id);
      kullanici.roles.cache.forEach(rol => {
        roller.push(rol.name);
      });

      let rol, i;
      for (i = 1; i < roller.length; i++) {
        let r = roller[roller.length - i];
        if (r.includes('«')) {
          rol = r;
          break;
        }
      }

      if (rol == undefined) {
        rol = '∑ « Muffin';
        kullanici.roles.add(kullanici.guild.roles.cache.find(r => r.name == rol));
      }

      let parcalar2 = rol.split(' '), simge = parcalar2[0], aralik = parcalar2[1];
      let yeni = `${simge} ${aralik} ${isim}`, yas_eki = `『${yas}』`;
      if (yas != 'NaN') { yeni += yas_eki; }

      kullanici.setNickname(yeni);
    }
    if(msg.content.startsWith(prefix + 'sıfırla') || msg.content.startsWith(prefix + 'sifirla')){
      msg.delete({ timeout: 1000, reason: 'It had to be done.' });

      let gonderen_rolleri = msg.guild.members.cache.get(msg.author.id).roles.cache;
      if (!gonderen_rolleri.some(r => r.name == '💂╏Kayıt Sorumlusu')) { return; }

      let parcalar = msg.content.split(' ');
      let kullanici_id = parcalar[1].slice(3, -1), kullanici = msg.guild.members.cache.get(kullanici_id);
      let kisi = kullanici.user.tag, parcalar3 = kisi.split("#"), kisiismi = parcalar3[0];

      kullanici.roles.set([]); kullanici.setNickname(kisiismi);
    }

  }
});

client.login(token);
