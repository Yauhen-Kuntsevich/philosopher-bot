import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
import { Bot } from "https://deno.land/x/grammy@v1.25.1/mod.ts";

const env = await load();
const botKey = env["BOT_API_KEY"];
console.log(botKey);