import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import {
  Bot,
  GrammyError,
  HttpError,
} from "https://deno.land/x/grammy@v1.25.1/mod.ts";
import works from "./data/works.json" with { "type": "json" }
import { getWorksDescription } from "./scripts/getWorks.ts";

const env = await load();
const botKey = env["BOT_API_KEY"];

const bot: Bot = new Bot(botKey);

bot.api.setMyCommands([
  {
    command: "name",
    description: "Цытата паводле імені філосафа",
  },
  {
    command: "topic",
    description: "Цытата паводле тэмы",
  },
  {
    command: "help",
    description: "Як працуе бот?",
  },
  {
    command: "works",
    description: "Працы, выкарыстаныя пры стварэнні бота",
  },
]);

bot.command("start", (ctx) => {
  ctx.reply("Вітанкі! Я <b>бот-філосаф</b>!", {
    parse_mode: "HTML",
  });
});

bot.command("works", (ctx) => {
  ctx.reply(getWorksDescription(works.works), {
    parse_mode: "MarkdownV2",
  });
});

bot.catch((err) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError) {
    console.error("Error in request:", e.description);
  } else if (e instanceof HttpError) {
    console.error("Could not contact Telegram:", e);
  } else {
    console.error("Unknown error:", e);
  }
});

bot.start();
