function showNumber(level = 1,objSaveGame) {
  $('.list-items').html('');
  let maxNumber;
  if(level == 1) maxNumber = 25;
  else if (level == 2) maxNumber = 50;
  else maxNumber = 100; 
  secretNumber = getRandomIntInclusive(1,maxNumber);
  console.log(secretNumber);
  let classButton;
  for(let i = 1; i <= maxNumber; i++) {
    classButton = 'btn btn-outline-dark';
    if(objSaveGame['btnWarning'].length > 0) {
      if(objSaveGame['btnWarning'].includes(i)) {
        classButton = 'btn btn-warning';
      }
    }
    if (objSaveGame['btnDanger'].length > 0) {
      if(objSaveGame['btnDanger'].includes(i)) {
        classButton = 'btn btn-danger';
      }
    }
    let btnNumber = `<button class="${classButton}" onClick="clickNumber(this)">${i}</button>`;
    
    setTimeout(() => {
      $('.list-items').append(btnNumber);
    }, (25 / level) * i);
  }
}

function clickNumber(number) {
  data = JSON.parse(localStorage.getItem('setting'));
  $(number).css('border','none');
  history($(number).text());
  showHintMessage(secretNumber,$(number).text());
  if($(number).text() == secretNumber) {
    $(number).addClass("btn-success").removeClass("btn-outline-dark btn-warning");
    $('.list-items').addClass('disabled');
    $('.tool ul li:first-child a').addClass('disabled');
    $('.tool ul li:nth-child(3) a').addClass('disabled');
    setTimeout(() => {
      alert('Bạn thắng!');
      let name = prompt("Nhập tên của bạn:", "Phờloren");
      while(name == null || name.trim() == '') name = prompt("Nhập tên của bạn:", "Phờloren");
      if(name != null || name.trim() != '') {
        saveLeaderBoard(name,life,data.level);
      }
    }, 350);
  } else {
    $(number).addClass("btn-danger").removeClass("btn-outline-dark btn-warning");
    reduceLife();
    life--;
    objSaveGame['btnDanger'].push(parseInt($(number).text()));
    saveData(secretNumber,data.level,life,objSaveGame);
  }
  if(life == 0) {
    showSecretNumber();
    setTimeout(() => alert('Thua'), 350);
    $('.list-items').addClass('disabled');
    $('.tool ul li:first-child a').addClass('disabled');
    $('.tool ul li:nth-child(3) a').addClass('disabled');
  }
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}
function history(value,save = true) {
  $('.history div input:last-child').remove();
  $('.history div').prepend(`<input type="text" disabled="" class="form-control" value="${value}">`);
  if(save) objSaveGame['historyNumber'].push(value);
}
function reduceLife() {
  $('.life i:last-child').remove();
  $('.life').prepend(`<i class="fas fa-heart-broken black">&nbsp</i>`);
}
function saveLeaderBoard(name,life,level){
  let data = JSON.parse(localStorage.getItem("leaderboard"));
  if(data == null) data = [];
  let objName = {
    name:name,
    score:life * 100 * level,
    level:level
  };
  data.push(objName);
  localStorage.setItem("leaderboard", JSON.stringify(data));
  showLeaderBoard();
}
function showLeaderBoard() {
  let data = JSON.parse(localStorage.getItem("leaderboard"));
  let xhtml = `<tr>
                <th>Index</th>
                <th>Name</th>
                <th>Score</th>
                <th>Level</th>
              </tr>`;
  if (data == null) {
    xhtml += `<tr><td colspan="4" class="red">EMPTY</td></tr>`;
  } else {
    data = data.sort((a,b) =>b.score - a.score);
    let index = 1;
    data.forEach(value => {
      xhtml += ` <tr>
                  <td>${index}</td>
                  <td>${value.name}</td>
                  <td>${value.score}</td>
                  <td>${value.level}</td>
                </tr>`;
      index++;
    });
  }
  $('#high-score table').html(xhtml);
}
function saveData(secretNumber,level = 1,life = 4,objSaveGame) {
  let data = {
    secretNumber: secretNumber,
    level : level,
    life : life,
    btnDanger: objSaveGame['btnDanger'],
    btnWarning: objSaveGame['btnWarning'],
    hintMessage: objSaveGame['hintMessage'],
    historyNumber: objSaveGame['historyNumber']
  };
  localStorage.setItem('setting',JSON.stringify(data));
}
function hint(secretNum,level) {
  let range = (10 * level) - 1;
  let firstNum = getRandomIntInclusive(1,range-1);
  let secondNum = range - firstNum;
  while (secretNum - firstNum < 1) {
    firstNum--;secondNum++;
  }
  let maxNum;
  if(level == 1) maxNum = 25;
  else if(level == 2) maxNum = 50;
  else maxNum = 100;
  while (secretNum + secondNum > maxNum) {
    firstNum++;secondNum--;
  }
  firstNum = secretNum - firstNum;
  secondNum = secretNum + secondNum;
  $('.list-items button').each(function(index,value) {
    if (index + 1 >= firstNum && index + 1 <=secondNum) {
      objSaveGame['btnWarning'].push(index + 1);
      setTimeout(() => {
        $(value).removeClass('btn-outline-dark').addClass('btn-warning');
        $(value).css('border','none');
      }, 30 * (index + 1));
    }
  });
  
}
function showHintRange(e) {
  let data = JSON.parse(localStorage.getItem('setting'));
  hint(secretNumber,data['level']);
  $(e).addClass('disabled');
  saveData(secretNumber,data.level,life,objSaveGame);
  $.notify("Gợi ý!", "success");
}
function showHintMessage(secretNumber,ClickNumber,save = true){
  let message = '';
  if (ClickNumber > secretNumber) {
    message = 'Số bạn chọn lớn hơn số bí mật';
  } else if (ClickNumber < secretNumber){
    message = 'Số bạn chọn nhỏ hơn số bí mật';
  } else {
    return;
  }
  let xhtml = `<div class="hint-message">
                <a href="#" class="btn-danger">Sai rồi!</a><br />
                <p>${message}</p>
              </div>`;

  $('#all-hint-message .content-load:last-child').remove();
  $('#all-hint-message').prepend(xhtml);
  if(save) {
    objSaveGame['hintMessage'].push(message);
    saveData(secretNumber,data.level,life,objSaveGame);
  }
}
function showSecretNumber(){
  let xhtml = `<h1>Số Bí Mật</h1>
              <a href="#" class="btn-danger">${secretNumber}</a>`;
  $('.secret-number').html(xhtml);
}
function reset(){
  life = 4;
  $('.life').html('');
  $('.history .form-group').html('');
  for (let i = 0; i < life; i++) {
    $('.life').append('<i class="fas fa-heart">&nbsp</i>');
    $('.history .form-group').append('<input type="text" disabled="" class="form-control">');
  }
  $('.list-items').removeClass('disabled');
  $('#all-hint-message').html(`
    <div class="load-message-1 content-load"></div>
    <div class="load-message-2 content-load"></div>
    <div class="load-message-3 content-load"></div>
    <div class="load-message-4 content-load"></div>
  `);
  for(let i = 1; i <= 4; i++) {
    contextLoader.addLoader('.load-message-'+i);
  }
  $('.secret-number').html('');
  $('.tool ul li a:first-child').removeClass('disabled');
  objSaveGame = {
    btnDanger: [],
    btnWarning: [],
    hintMessage: [],
    historyNumber: []
  };
}
function loadSaveGame(){
  if(lifeTime > 10) return;
  let data = JSON.parse(localStorage.getItem('setting'));
  $('.slt-level').val(data['level']);
  data['historyNumber'].map(value => {
    history(value,false);
    showHintMessage(secretNumber,value,false);
  });
  for(let i = 1; i <= 4 - life; i++) {
    reduceLife();
  }
}