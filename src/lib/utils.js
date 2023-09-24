const generateFibonacciSeries = (upto = 21) => {
  let n1 = 1;
  let n2 = 2;
  let n3 = 3;
  let nextTerm = n2 + n3;
  const series = [n1, n2, n3];

  while (nextTerm <= upto) {
    series.push(nextTerm);
    n2 = n3;
    n3 = nextTerm;
    nextTerm = n3 + n2;
  }
  series.push("?");
  return series;
};

const getInviteRoomLink = (room) => {
  return `${window.location.host}/?room=${room}`;
};

const writeToClipboard = async (content) => {
  await navigator.clipboard.writeText(content);
};

export { generateFibonacciSeries, getInviteRoomLink, writeToClipboard };
