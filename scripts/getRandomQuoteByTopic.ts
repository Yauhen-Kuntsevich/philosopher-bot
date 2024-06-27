export interface IQuote {
  id: number;
  author: string;
  quoteText: string;
}

export function getRandomQuoteByTopic(quotes: Array<IQuote>): IQuote {
  const randomIndex = Math.round(Math.random() * quotes.length);
  return quotes[randomIndex];
}
