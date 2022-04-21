$(document).ready(function () {
  getLocalStorage('task');
  $('#btn-submit').click(function (e) { 
    e.preventDefault();
    let taskName = $('#input-name').val();
    if(taskName.trim() != '') {
      let inputLevel = $('#input-level').val();
      addLocalStorage(taskName,inputLevel);
      $('#input-name').val('');
      $('#input-level').val(0);
    } else {
     
    }
  });
});
function addLocalStorage(name,level) {
  let data = getLocalStorage('task');
  let task = [];
  let id;
  if(data != null) {
    id = data['id'] + 1;
    task = data['task']
  } else {
    id = 1;
  }
  let objTask = {
    id : id,
    name : name,
    level : level,
  };
  task.push(objTask);
  localStorage.setItem('task', JSON.stringify(task));
  getLocalStorage('task');
}
function getLocalStorage(task) {
  let data = [];
  let arrTask = JSON.parse(localStorage.getItem(task));
  if(arrTask != null) {
    data['id'] = arrTask.length;
    data['task'] = arrTask;
    let task = '';
    arrTask.map((item) => {
      let option = getLevel(item['level']);
      task += `<tr>
                    <td>${item['id']}</th>
                    <td>${item['name']}</td>
                    <td><span class="badge ${option['btn']}">${option['level']}</span></td>
                    <td>
                        <button class="btn btn-warning" onClick=editTask(${item['id']})>Edit</button>
                        <button class="btn btn-danger" onClick=deleteTask(${item['id']})>Delete</button>
                    </td>
                  </tr>`;
    });
    $('#area-list-task').html(task);
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
function editTask(id) {

}
function deleteTask(id) {
  let arrTask = JSON.parse(localStorage.getItem('task'));
  arrTask.forEach((value,index) => {
    if(id == value['id']) arrTask.splice(index,1);
  });
  localStorage.setItem('task', JSON.stringify(arrTask));
  getLocalStorage('task');
}
