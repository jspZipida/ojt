
const root = document.getElementById('root');
const addBtn = document.querySelector('#button1'); 
const insertItemText = document.querySelector('#itemText'); 
const todoList = document.querySelector('#list'); 

let item = [];

function insertItem(text){

  var sendParam = {};
  sendParam.text = text;
  sendParam.id = item.length + 1;
  item.push(sendParam);
  localStorage.setItem('item', JSON.stringify(item));
  sendParam = {};
  drawList(text);
  insertItemText.value = "";
}

function reloadPage(){

}

function selectList(){
  var getList = JSON.parse(localStorage.getItem('item'));
  if(getList === null){
    return false;
  } else{
      getList.forEach(function(item){
        drawList(item.text);
      });
  }
  item = getList;
  getList = [];
}

function drawList(item){
  const li = document.createElement('li');
  const span = document.createElement('span');
  const deleteBtn = document.createElement('button');

  span.innerHTML = item;
  deleteBtn.innerText = 'Del';
  deleteBtn.id = 'delBtn';
  deleteBtn.onclick = deleteList;

  li.appendChild(span);
  li.appendChild(deleteBtn); 
  todoList.appendChild(li); 
}

function deleteList(param){
  var getList = JSON.parse(localStorage.getItem('item'));
  let deleteValue = param.target.parentNode; //li 추적
  const list = document.querySelectorAll('li');
  const arrayList = [...list]; // 깊은 복사 해야지 index tracking 가능
  
  let indexOfTarget = arrayList.indexOf(deleteValue);

  // html li 초기화
  for(let i=0;i<list.length;i++){   
    list[i].remove();
  }

  // li 새로 그리기
  getList.splice(indexOfTarget, 1);
  item = getList; 
  localStorage.setItem('item', JSON.stringify(item));
  selectList();
}

function initPage(){
  selectList();
}

initPage();