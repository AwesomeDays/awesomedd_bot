const GoogleSpreadsheet = require('google-spreadsheet');
const config = require('./config.json');
const RandomOrg = require('random-org');

const doc = new GoogleSpreadsheet(config.gsheets.sheetId);
const random = new RandomOrg({ apiKey: config.random });

let sheet;

doc.useServiceAccountAuth(config.gsheets.gjson, () => {
  console.log('auth ok');
  doc.getInfo(function(err, info) {
    sheet = info.worksheets[0];
    console.log('sheet ok');
  });
});

function addRow(newRow, cb) {
  if (!sheet) { return cb(false); }
  sheet.addRow(newRow, (err, rows) => {
    if (err) { return cb(false); }
    return cb(true);
  });
}

function getRandom(cb) {
  sheet.getCells((err, cells) => {
    if (err) { return cb(false); }
    const themes = [];
    cells.forEach((cell) => {
      if (cell.col == 2) {
        themes.push(cell.value);
      }
    });
    random.generateIntegers({ min: 1, max: themes.length - 1, n: 1 }).then((result) => {
      cb(themes[result.random.data]);
    });
  });
}

module.exports = {
  addRow,
  getRandom,
}
