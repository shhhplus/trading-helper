// example:
// basePrice(fen): 1000(10.00元)
// max(%): 10
// sell(%): 8

type Params = {
  basePrice: number;
  maxPpts: number;
  sellPpts: number;
};

function calcReal(basePrice: number, ppts: number) {
  const realPrice = Math.round(basePrice * (1 + ppts / 100));
  const realPpts = Math.round((realPrice / basePrice - 1) * 10000) / 100;
  return {
    price: realPrice,
    ppts: realPpts,
  };
}

export function calc({ basePrice, maxPpts, sellPpts }: Params) {
  const realMax = calcReal(basePrice, maxPpts);
  const realSell = calcReal(basePrice, sellPpts);
  const realMaxMinus1 = {
    price: realMax.price - 1,
    ppts: Math.round(((realMax.price - 1) / basePrice - 1) * 10000) / 100,
  };

  return {
    max: realMax,
    maxMinus1: realMaxMinus1,
    sell: realSell,
    pullbackToMax:
      Math.round((1 - realSell.price / realMax.price) * 10000) / 100,
    pullbackToMaxMinus1:
      Math.round((1 - realSell.price / realMaxMinus1.price) * 10000) / 100,
  };
}

// const collections = [
//   {
//     params: [1000, 10, 8],
//     expect: {
//       max: { price: 1100, ppts: 10 },
//       maxMinus1: { price: 1099, ppts: 9.9 },
//       sell: { price: 1080, ppts: 8 },
//       pullbackToMax: 1.82,
//       pullbackToMaxMinus1: 1.73,
//     },
//   },
// ];
