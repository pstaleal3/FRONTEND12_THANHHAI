function showNumber(level = 1) {
  $('.list-items').html('');
  let maxNumber;
  if(level == 1) maxNumber = 25;
  else if (level == 2) maxNumber = 50;
  else maxNumber = 100; 
  secretNumber = getRandomIntInclusive(1,maxNumber);
  let secretData;
  for(let i = 1; i <= maxNumber; i++) {
    secretData = (secretNumber == i) ? true : false;
    let btnNumber = `<button data-secret="${secretData}" class="btn btn-outline-dark" onClick="clickNumber(this)">${i}</button>`;
    setTimeout(() => {
      $('.list-items').append(btnNumber);
    }, (25 / level) * i);
  }
}

function clickNumber(number) {
  $(number).css('border','none');
  history($(number).text());
  showHintMessage(secretNumber,$(number).text());
  if($(number).data('secret')) {
    $(number).addClass("btn-success").removeClass("btn-outline-dark btn-warning");
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
    btnDanger.push(parseInt($(number).text()));
    saveData(secretNumber,data.level,life,btnDanger,btnWarning,hintMessage);
  }
  if(life == 0) {
    showSecretNumber();
    setTimeout(() => alert('Thua'), 350);
  }
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); 
}
function history(value) {
  $('.history div input:last-child').remove();
  $('.history div').prepend(`<input type="text" disabled="" class="form-control" value="${value}">`);
  historyNumber.push(value);
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
function saveData(secretNumber,level = 1,life = 4,btnDanger = [],btnWarning = [],hintMessage = []) {
  let data = {
    secretNumber: secretNumber,
    level : level,
    life : life,
    btnDanger: btnDanger,
    btnWarning: btnWarning,
    hintMessage: hintMessage
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
  $('button[data-secret]').each(function(index,value) {
    if (index + 1 >= firstNum && index + 1 <=secondNum) {
      btnWarning.push(index + 1);
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
  saveData(secretNumber,data.level,life,btnDanger,btnWarning,hintMessage);
}
function showHintMessage(secretNumber,ClickNumber){
  let message = '';
  if (ClickNumber > secretNumber) {
    message = 'Số bạn chọn lớn hơn số bí mật';
  } else {
    message = 'Số bạn chọn nhỏ hơn số bí mật';
  }
  let xhtml = `<div class="hint-message">
                <a href="#" class="btn-danger">Sai rồi!</a><br />
                <p>${message}</p>
              </div>`;
  $('#all-hint-message').append(xhtml);
  hintMessage.push(message);
  saveData(secretNumber,data.level,life,btnDanger,btnWarning,hintMessage);
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
  $('#all-hint-message').html('');
  $('.secret-number').html('');

}