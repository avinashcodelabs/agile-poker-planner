const generateFibonacciSeries = (upto = 13) => {
  let n1 = 0;
  let n2 = 1;
  let nextTerm = n1 + n2;
  const series = [n1, n2];

  while (nextTerm <= upto) {
    series.push(nextTerm);
    n1 = n2;
    n2 = nextTerm;
    nextTerm = n1 + n2;
  }
  return series;
};

export { generateFibonacciSeries };
