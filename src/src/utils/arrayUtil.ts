export const getNShuffleddata = (array: any[], count: number) : any[] => {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};