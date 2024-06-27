import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import {
  Bot,
  GrammyError,
  HttpError,
} from "https://deno.land/x/grammy@v1.25.1/mod.ts";

import worksObj from "./data/works.json" with { "type": "json" }; 
import topics from "./data/quotes.json" with { "type": "json" };
import { getWorksDescription } from "./scripts/getWorksDescription.ts";
import { IQuote, getRandomQuoteByTopic } from "./scripts/getRandomQuoteByTopic.ts";

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

bot.command("start", async (ctx) => {
  await ctx.reply("Вітанкі! Я <b>бот-філосаф</b>!", {
    parse_mode: "HTML",
  });
});

bot.command("topic", async (ctx) => {
  const quote = getRandomQuoteByTopic(topics["зло"]);
  await ctx.reply(`${quote.quoteText}`);
})

bot.command("works", (ctx) => {
  ctx.reply(getWorksDescription(worksObj.works), {
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
