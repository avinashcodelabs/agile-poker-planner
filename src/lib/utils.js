const generateFibonacciSeries = (upto = 13) => {
  let n1 = 0;
  let n2 = 1;
  let n3 = 2;
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

export { generateFibonacciSeries };
