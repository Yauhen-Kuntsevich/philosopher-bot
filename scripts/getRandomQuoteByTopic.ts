interface IQuote {
  id: number;
  author: string;
  text: string;
  interpretation?: string;
}

export function getRandomQuoteByTopic(quotes: Array<IQuote>): IQuote {
  const randomIndex = Math.round(Math.random() * quotes.length);
  return quotes[randomIndex];
}
