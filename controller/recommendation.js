const data = require("../ProductItem/product.json");
const scorearray = require("../algorithms");
const recom = async (req, res, next) => {
  let { id } = req.params;
  // let id = '1'

  const filteredArray = scorearray.filter(
    (item) => item.id === id || item.id1 === id
  );

  const sortedArray = filteredArray.sort((a, b) => b.score - a.score);
  // console.log(sortedArray)

  const topThree = sortedArray.slice(0, 3);
  console.log(topThree);

  // const array = [  { id: '27', id1: '1', score: 0.06596311249767592 },  { id: '15', id1: '1', score: 0.051570159427414906 },  { id: '13', id1: '1', score: 0.05136716072111169 }];

  const uniqueIds = topThree.reduce((acc, item) => {
    if (!acc.includes(item.id)) {
      acc.push(item.id);
    }
    if (!acc.includes(item.id1)) {
      acc.push(item.id1);
    }
    return acc.filter((item) => item !== id);
  }, []);

  let recomdata = [];
  for (i = 0; i < uniqueIds.length; i++) {
    let id = uniqueIds[i];
    let rec = data.findIndex((item) => item.id === id);
    recomdata[i] = data[rec];
  }
  // console.log(recomdata);
  // const result = recomdata.map((product) => {
  //   const matchingScore = topThree.find((score) => score.id === product.id);
  //   const score = matchingScore ? matchingScore.score : null;
  //   return { ...product, score };
  // });
  // console.log(result)

  res.status(200).json({
    success: true,
    recomdata,
  });
};
module.exports = recom;
