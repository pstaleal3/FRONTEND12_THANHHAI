let life ;
let secretNumber;
let level;
let objSaveGame = {};
// let btnDanger = [];
// let btnWarning = [];
// let hintMessage = [];
// let historyNumber = [];
let lifeTime = (Date.now() - localStorage.getItem('saveTime'))/1000;
if (lifeTime > 10) {
  life = 4;
  objSaveGame = {
    btnDanger: [],
    btnWarning: [],
    hintMessage: [],
    historyNumber: []
  };
} else {
  let data = JSON.parse(localStorage.getItem('setting'));
  life = data['life'];
  level = data['level'];
  secretNumber = data['secretNumber'];
  objSaveGame['btnDanger'] = data['btnDanger'];
  objSaveGame['btnWarning'] = data['btnWarning'];
  objSaveGame['hintMessage'] = data['hintMessage'];
  objSaveGame['historyNumber'] = data['historyNumber'];
}

