export const COLORS = [
  "#F87171",
  "#FB923C",
  "#FBBF24",
  "#A3E635",
  "#4ADE80",
  "#2DD4BF",
  "#2DD4BF",
  "#22D3EE",
  "#60A5FA",
  "#818CF8",
  "#A78BFA",
  "#C084FC",
  "#E879F9",
  "#F472B6",
  "#FB7185",
  "#F472B6",
  "#A8A29E",
  "#94A3B8",
];
const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * COLORS.length);
  return COLORS[randomIndex];
};

export default getRandomColor;
