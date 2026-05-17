/*
querySelector()
→ CSS 선택자 방식으로 HTML 요소를 가져오는 메서드

<예시>
#todoForm      → id가 todoForm인 요소
.todo-item     → class가 todo-item인 요소
button         → button 태그 요소

이런식으로 getElementById()와 비슷하게 요소를 가져오지만,
querySelector()는 CSS 선택자를 사용할 수 있어서
더 다양한 방식으로 요소를 선택할 수 있다.

실무에서는 querySelector(), querySelectorAll()을 많이 사용한다고 한다...

*/


const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('#todoList');
const emptyMessage = document.querySelector('#emptyMessage');

function updateEmptyMessage() {
  const todoItems = todoList.querySelectorAll('.todo-item');
  emptyMessage.style.display = todoItems.length === 0 ? 'block' : 'none'; // 할 일 없으면 할 일 추가해달라는 메시지 보이기(block)
}

function createTodoItem(todoText) {

  // .createElement로 새로운 HTML 요소를 만들고 (<li> 태그)
  const li = document.createElement('li');
  li.className = 'todo-item'; // 클래스 이름 만들고

  const label = document.createElement('label');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = todoText;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-btn';
  deleteButton.textContent = '삭제';


  // appendChild(), 생성한 HTML 요소를 부모 요소 안에 추가하는 메서드
  label.appendChild(checkbox);
  label.appendChild(span);
  li.appendChild(label);
  li.appendChild(deleteButton);

  return li;
}

todoForm.addEventListener('submit', function (event) { // form 제출될 때 발생하는 이벤트 : submit
  
  // 기본 form 제출 동작(새로고침) 막기
  event.preventDefault();


  // input에 입력한 값 가져오기 (앞뒤 공백 제거)
  const todoText = todoInput.value.trim();


  // 입력값이 비어있으면 경고 알림
  if (todoText === '') {
    alert('할 일을 입력해주세요!');
    return;
  }


  // 안 비어 있으면 할 일 추가
  const todoItem = createTodoItem(todoText);
  todoList.appendChild(todoItem);

  todoInput.value = '';
  todoInput.focus();
  updateEmptyMessage();
});



todoList.addEventListener('click', function (event) { // 투두리스트 클릭하면
  if (event.target.type === 'checkbox') {
    event.target.closest('.todo-item').classList.toggle('completed'); // event.target : 실제로 클릭한 요소
  }

  if (event.target.classList.contains('delete-btn')) {

    event.target.closest('.todo-item').remove();
    // closest('.todo-item') :  → 가장 가까운 부모 요소 중 class가 todo-item인 요소 찾기
    

    // 할 일이 비었는지 다시 확인
    updateEmptyMessage();
  }
});

updateEmptyMessage();
