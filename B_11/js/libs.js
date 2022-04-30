function addLocalStorage(name,level) {
  let data = getLocalStorage(TASK);
  let id = randomString(13);
  let task = (data != null) ? data : [];
  let objTask = {
    id : id,
    name : name,
    level : level,
  };
  task.push(objTask);
  localStorage.setItem(TASK, JSON.stringify(task));
  showTask(task);
  $.notify('Add Success!',{ className: "success" });
}
function getLocalStorage(task) {
  let data = [];
  let arrTask = JSON.parse(localStorage.getItem(task));
  if(arrTask != null) {
    data = arrTask;
    showTask(arrTask);
    return data;
  }
}
function getLevel(inputLevel) {
  let option = [];
  switch (parseInt(inputLevel)) {
    case 0:
      option['level'] = 'Small';
      option['btn'] = 'bg-dark';
      break;
    case 1:
      option['level'] = 'Medium';
      option['btn'] = 'bg-info';
      break;
    case 2:
      option['level'] = 'High';
      option['btn'] = 'bg-danger';
      break;
  }
  return option;
}
function addTaskToInput(id) {
  $('#area-form').slideDown();
  let item;
  let arrTask = JSON.parse(localStorage.getItem(TASK));
  arrTask.forEach((value,index) => {
    if(id == value['id']) item = value;
  });
  $('#input-name').val(item['name']);
  $('#input-level').val(item['level']);
  $('#btn-submit').css("display", "none");
  $('#btn-edit').css("display", "block");
  localStorage.setItem('edit-id', id);
}
function editTask() {
  let item = {};
  id = localStorage.getItem('edit-id');
  let arrTask = JSON.parse(localStorage.getItem(TASK));
  item['name'] = $('#input-name').val();
  item['level'] = $('#input-level').val();
  arrTask.forEach((value,index) => {
    if(id == value['id']) {
      value['name'] = item['name'];
      value['level'] = item['level'];
    }
  });
  localStorage.setItem(TASK, JSON.stringify(arrTask));
  $('#btn-submit').css("display", "block");
  $('#btn-edit').css("display", "none");
  showTask(arrTask);
  clear();
  $.notify('Edit Success!',{ className: "success" });
}
function deleteTask(id) {
  let arrTask = JSON.parse(localStorage.getItem(TASK));
  arrTask.forEach((value,index) => {
    if(id == value['id']) arrTask.splice(index,1);
  });
  localStorage.setItem(TASK, JSON.stringify(arrTask));
  showTask(arrTask);
  $.notify('Delete Success!',{ className: "success" });
}

function randomString(len) {
  var text = "";
  var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < len; i++)
    text += charset.charAt(Math.floor(Math.random() * charset.length));
  return text;
}
function clear() {
  $('#input-name').val('');
  $('#input-level').val(0);
}
function searchTask(string) {
  let arrTask = JSON.parse(localStorage.getItem(TASK));
  let results = arrTask.filter(value => value['name'].indexOf(string) != -1);
  results = results.filter(value =>value['name'] = value['name'].replaceAll(string,`<span class="red">${string}</span>`));
  showTask(results);
}
function showTask(array) {
  let task = '';
  let index = 1;
  array.map((item) => {
    let option = getLevel(item['level']);
    task += `<tr>
                  <td>${index}</th>
                  <td>${item['name']}</td>
                  <td><span class="badge ${option['btn']}">${option['level']}</span></td>
                  <td>
                      <button class="btn btn-warning" onClick=addTaskToInput("${item['id']}")>Edit</button>
                      <button class="btn btn-danger" onClick=deleteTask("${item['id']}")>Delete</button>
                  </td>
                </tr>`;
    index++;
  });
  $('#area-list-task').html(task);
}
function filter(text) {
  let arrFilter = text.toLowerCase().split(' - ');
  let column = arrFilter[0];
  let orderBy = arrFilter[1];
  let arrTask = JSON.parse(localStorage.getItem(TASK));
  if(orderBy == 'asc') arrTask.sort((a,b)=> (a[column] > b[column] ? 1 : -1));
  else arrTask.sort((a,b)=> (a[column] < b[column] ? 1 : -1));
  showTask(arrTask);
}