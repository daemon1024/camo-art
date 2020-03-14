const gm = require("gm").subClass({ imageMagick: true });
require("dotenv").config();
const fs = require("fs");
const token = process.env.TELEGRAM_API_TOKEN;
const Telegraf = require("telegraf");

const bot = new Telegraf(token);

bot.command("camo", async ctx => {
  //   console.log(ctx);
  let resp = ctx.message.text.split(" ");
  resp = resp[1];
  let hue = Math.floor(Math.random() * 200);
  await gm(__dirname + "/base.jpeg")
    .modulate(100, 100, hue)
    .fill(`hsl(${hue - 100 > 0 ? hue - 100 : 300 - hue},200,140)`)
    .font("FusakaStd.otf", 1152 / resp.length)
    .drawText(115, resp.length > 2 ? 656 : resp.length == 1 ? 1000 : 780, resp)
    .write(__dirname + "/output.jpg", function(err) {
      if (!err) console.log(resp, "sent");
      if (err) console.log(err);
      ctx.replyWithPhoto({
        source: fs.createReadStream(__dirname + "/output.jpg")
      });
    });
});
bot.launch();
