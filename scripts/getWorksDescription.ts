interface IWork {
  author: string;
  title: string;
  translator: string;
}

export function getWorksDescription(works: Array<IWork>): string {
  let description = '';
  for (const work of works) {
    description += `*Аўтар*: ${work.author}\n*Назва твору*: ${work.title}\n*Перакладчык*: ${work.translator}\n\n`;
  }
  return description;
}
