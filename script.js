document.getElementById("add_button").addEventListener("click", addCard);

let companyName;
let symbol;
let previousClose;
let currentPrice;
let percentage;
let runningText = "";
let fiveMonths = [];
let stock;
let historicalObject;
// fetch(
//   "https://api.currentsapi.services/v1/search?keywords=NASDAQ&apiKey=lM5U7IsA_4X3K9ptIETiYPQrnZYhIHDd8puZBu8xo2_uA-5P"
// )
//   .then((news) => news.json())
//   .then((data) => {
//     data.news.forEach((item) => {
//       runningText += item.title + ". ";
//     });
//     document.getElementById("scroll-text").innerHTML = runningText;
//   });

function getData() {
  const beginURL =
    "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=";
  const endURL = "&apikey=DNWKKV20PPR5UY6Q";
  const input = document.getElementById("stock_symbol").value;
  stock = input.toLowerCase();
  const apiURL = beginURL + stock + endURL;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      symbol = data["Global Quote"]["01. symbol"];
      previousClose = data["Global Quote"]["08. previous close"];
      currentPrice = parseFloat(data["Global Quote"]["05. price"]).toFixed(2);
      percentage = parseFloat(
        data["Global Quote"]["10. change percent"]
      ).toFixed(2);
      if (symbol == null) {
        return;
      } else {
        createCard(symbol, currentPrice, percentage);
      }
    });

  addInfo(stock);

  document.forms["form"].reset();
}

function addInfo(stock) {
  beginUrlInfo = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=";
  endUrlInfo = "&apikey=PW8QG04LKVP3H7Y5";
  completeURLInfo = beginUrlInfo + stock + endUrlInfo;
  let name;
  let address;
  let industry;
  let high52;
  let low52;
  let lastSplit;
  let splitRatio;
  let analystTarget;

  fetch(completeURLInfo)
    .then((resInfo) => resInfo.json())
    .then((dataInfo) => {
      name = dataInfo.Name;
      address = dataInfo.Address;
      industry = dataInfo.Sector;
      analystTarget = dataInfo.AnalystTargetPrice;
      high52 = dataInfo["52WeekHigh"];
      low52 = dataInfo["52WeekLow"];
      lastSplit = dataInfo.LastSplitDate;
      splitRatio = dataInfo.LastSplitFactor;

      let companyInfo = document.getElementById("pCompany");
      companyInfo.innerHTML = "";

      companyInfo.innerHTML =
        name +
        "<br>" +
        address +
        "<br>Industry: " +
        industry +
        "<br>Analyst Target Price: " +
        analystTarget +
        "<br>52 Week High: " +
        high52 +
        "<br>52 Week Low: " +
        low52 +
        "<br>Last Split: " +
        lastSplit +
        "<br>Split Factor: " +
        splitRatio;
    });
}

function createCard(symbol, currentPrice, percentage) {
  let card = document.createElement("div");
  card.id = "card";
  card.className = "card";
  card.style.width = "14rem";
  card.style.height = "auto";
  document.getElementById("results").append(card);

  let cardBody = document.createElement("div");
  cardBody.id = "card-body";
  cardBody.className = "card-body";
  card.append(cardBody);

  // let companyNameTag = document.createElement("h5");
  // companyNameTag.className = "card-title text-center";
  // companyNameTag.innerHTML = companyName;
  // cardBody.append(companyNameTag);

  let stockSymbol = document.createElement("h5");
  stockSymbol.className = "card-title text-center card-text";
  stockSymbol.innerHTML = symbol;
  stockSymbol.style.color = "#2c2736";
  cardBody.append(stockSymbol);

  let currentPriceTag = document.createElement("h5");
  currentPriceTag.className = "card-title text-center card-text";
  currentPriceTag.innerHTML = "$" + currentPrice;
  currentPriceTag.style.color = "#0a67f2";
  cardBody.append(currentPriceTag);

  let percentageTag = document.createElement("h5");
  percentageTag.className = "card-title text-center card-text";
  percentageTag.innerHTML = percentage + "%";
  cardBody.append(percentageTag);
  percentageTag.style.color = percentage > 0 ? "green" : "red";

  const beginChart =
    "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
  const endChart = "&apikey=Y11A972UH1743H94";
  const chartURL = beginChart + stock + endChart;

  fiveMonths = [];
  fetch(chartURL)
    .then((chart) => chart.json())
    .then((chartData) => {
      let charObj = Object.entries(chartData["Time Series (Daily)"]);
      charObj.forEach((item) => {
        fiveMonths.push(parseInt(item[1]["4. close"]));
      });

      let theChart = document.createElement("canvas");
      theChart.style.width = "400";
      theChart.style.height = "400";
      cardBody.append(theChart);
      let cardChart = theChart.getContext("2d");
      var myChart = new Chart(cardChart, {
        type: "line",
        data: {
          labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
          datasets: [
            {
              label: symbol,
              data: [
                fiveMonths[99],
                fiveMonths[79],
                fiveMonths[59],
                fiveMonths[39],
                fiveMonths[19],
                fiveMonths[0],
              ],
              backgroundColor: ["rgba(48, 195, 195)"],
              borderColor: ["rgb(7,7,7)"],
              borderWidth: 1,
            },
          ],
        },
        options: {},
      });
      //button logo
      let addToFav = document.createElement("input");
      addToFav.type = "image";
      addToFav.id = "addFav";
      addToFav.className = "text-center";
      addToFav;
      addToFav.src = "logosmall.png";
      cardBody.append(addToFav);
    });
}

// function drawChart(stock) {

// }

function addCard() {
  getData();
}
