const Portfolio = require("../model/Portfolio");

exports.IndexPage = async (req, res) => {
  const portfolios = await Portfolio.find({});
  res.render("index", { portfolios, selectedPortfolio: null, });
};

exports.EditPage = async (req, res) => {
  const portfolios = await Portfolio.find({});
  const selectedPortfolio = await Portfolio.findById(req.params.id);
  res.render("index", { selectedPortfolio, portfolios });
};
