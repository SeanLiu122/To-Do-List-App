const lists = [
  {todo: '100 push-ups'},
  {todo: '100 sit-ups'},
  {todo: '100 squats'},
  {todo: '10km running'}
];
// const done_lists = [{}];

const ToDoListsDOM = document.querySelector('#to-do-list-box');
const CompleteListsDOM = document.querySelector("#done-list-box");

// To add data to the left UI dom
const addData = () => {
  const data = document.getElementById("addListItem").value;
  if(data == ''){
    document.getElementById('addBtn').setAttribute('disabled', true);
    document.getElementById('addBtn').removeAttribute("disabled");
  }else{
    const node = domTemplate(data, '&#8594;', 'to-do-list-buttons');  // create a row node
    const first_child = document.getElementById('to-do-list-box').childNodes[0];
    ToDoListsDOM.insertBefore(node, first_child);
  }
  init();
}

// To render the inital list data (dummy data)
function listsDisplayListener() {
  lists.forEach((list, index) => {
    const node = domTemplate(list.todo, '&#8594;', 'to-do-list-buttons');
    ToDoListsDOM.appendChild(node);
  });
}

// A function to update the right UI
const updateDoneListsUI = (node) => {
  node.getElementsByTagName('button')[0].innerHTML = '&#8592;'; 
  const n = node.getElementsByClassName('grid-column')[1];
  n.setAttribute('id', 'done-list-buttons');
  const first_child = document.getElementById('done-list-box').childNodes[0];
  CompleteListsDOM.insertBefore(node, first_child);
  init();
}

// A function to update the left UI
const updateToDoListsUI = (node) => {
  node.getElementsByTagName('button')[0].innerHTML = '&#8594;';  // changed back the arrow button
  const n = node.getElementsByClassName('grid-column')[1];
  n.setAttribute('id', 'to-do-list-buttons');
  ToDoListsDOM.appendChild(node); 
  init();
}

// A listener function to listen the done button
const doneButtonsListener = () => {
  const data = document.querySelectorAll('#to-do-list-buttons');
  // console.log(data[0].childNodes[0]);
  Object.entries(data).forEach(([key, val]) => {    // ES6 to loop through an object
    val.childNodes[0].addEventListener('click', () => {
      // console.log(val.parentNode.innerText.split('\n')[0]);
      // updateData(val.parentNode, val.parentNode.innerText.split('\n')[0]);
      updateDoneListsUI(val.parentNode);
    });
  });
}

// A listener function to listen the undone button
const undoneButtonsListener = () => {
  const data = document.querySelectorAll('#done-list-buttons');
  Object.entries(data).forEach(([key, val]) => {    
    val.childNodes[0].addEventListener('click', () => {
      // updateData(val.parentNode, val.parentNode.innerText.split('\n')[0]);
      updateToDoListsUI(val.parentNode);
    });
  });
}

// A listener function to keep listening delete buttons
const deleteButtonsListener = () => {
  const data = document.getElementsByTagName('INPUT');
  Object.entries(data).forEach(([key, val]) => {    
    if(val.getAttribute('type') === 'checkbox'){
      val.addEventListener('click', () => {
        const parent = val.parentNode.parentNode;
        console.log('Row: ' + parent.innerText.split('\n')[0] + ', delete button has been clicked!');
        parent.remove();
      });
    }
  });
}

// A function to generate the dom
const domTemplate = (value, btn_value, container_id) => {
  // create row node
  const row_node = document.createElement('DIV');
  row_node.setAttribute("class", "grid-row");

  // create col1 node
  const col_node1 = document.createElement('DIV');
  col_node1.setAttribute('class', 'grid-column');
  // const text_node = document.createTextNode(done_lists[0][Object.keys(done_lists[0])]);
  const text_node = document.createTextNode(value);
  col_node1.appendChild(text_node);

  // create col2 node
  const col_node2 = document.createElement('DIV');
  col_node2.setAttribute('class', 'grid-column');
  col_node2.setAttribute('id', container_id);

  const moveBtn = document.createElement('BUTTON');
  moveBtn.setAttribute('type', 'submit');
  moveBtn.innerHTML = btn_value;
  
  const delBtn = document.createElement('INPUT');
  delBtn.setAttribute('type', 'checkbox');

  col_node2.appendChild(moveBtn);
  col_node2.appendChild(delBtn);
  // end of col2 node

  row_node.appendChild(col_node1);
  row_node.appendChild(col_node2);

  return row_node;
}

/*============================================================================================================
An initial event for the browser to finish reading and loading all HTMLs into the DOM first, and then 
perform other events.
============================================================================================================*/
document.addEventListener('DOMContentLoaded', init); 
listsDisplayListener();
function init(){
  doneButtonsListener();
  undoneButtonsListener();
  deleteButtonsListener();
  document.getElementById("addBtn").addEventListener("click", addData);
}
 