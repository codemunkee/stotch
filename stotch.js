#!/usr/bin/env node

const http = require('http')
const xml2js = require('/Users/rnealis/Projects/Solo/nodebox/node_modules/xml2js/lib/xml2js')
const args = process.argv;
symbol = args[2];

function parseData(xml) {
    xml2js.parseString(xml, (err, result) => {
        lastPrice = result.StockQuote.LastPrice[0];
        openPrice = result.StockQuote.Open[0];
        change = result.StockQuote.Change[0];
        changePercent = round(result.StockQuote.ChangePercent[0], 2);
        changeDirection = (change >= 0) ? '+' : '-';
        console.log(`${lastPrice} from ${openPrice} (${changeDirection}${changePercent}%)`);
    });
}

http.get('http://dev.markitondemand.com/MODApis/Api/v2/Quote?symbol=' + symbol, (resp) => {
    let data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
      parseData(data);
  });
});

function round(value, decimals) {
  return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
