\---



\# 이벤트 처리하기



React에선 어떻게 이벤트를 처리할까?



\---



\## 이벤트 핸들러



특정 이벤트가 발생했을 때 실행되어 해당 이벤트를 처리하는 함수



React에서는 \*\*보통 콜백 함수 형태로 등록\*\*



```jsx

function handleClick() {

&#x20; console.log("클릭");

}



handleClick(); // 이렇게 직접 호출하면 콜백함수가 아닌거죠

```



\- 이벤트 핸들러는 역할을 의미

\- 콜백 함수는 호출 방식을 의미



\### 이벤트 처리 과정



```jsx

function App(){

&#x09;	function handleClick(){ // 1. 선언

&#x09;			alert("버튼이 클릭되었습니다!"); // 2. 작성

&#x09;	}

&#x09;	

&#x09;	

&#x09;	return(

&#x09;			<button onClick={handleClick}> // 3. 이벤트에 이벤트 핸들러 작성

&#x09;					클릭

&#x09;			</button>

&#x09;	)

}

```



\---



\### 이벤트 전파



브라우저에서 발생한 이벤트가 DOM 트리를 따라 전달되는 과정



세 가지 단계가 있다!



!image.png



알고 들어가야하는 점



\*\*같은 이벤트(click)라도 캡처링용 핸들러와 버블링용 핸들러는 별개로 등록할 수 있다!!\*\*



```jsx

function App() {

&#x20; return (

&#x20;   <div

&#x20;     className="container"

&#x20;     onClickCapture={() => {

&#x20;       console.log("Click Capture Parent");

&#x20;     }}

&#x20;     onClick={() => {

&#x20;       console.log("Click Parent");

&#x20;     }}

&#x20;   >

&#x20;     Parent



&#x20;     <div

&#x20;       className="container"

&#x20;       onClickCapture={() => {

&#x20;         console.log("Click Capture Child");

&#x20;       }}

&#x20;       onClick={() => {

&#x20;         console.log("Click Child");

&#x20;       }}

&#x20;     >

&#x20;       Child

&#x20;     </div>

&#x20;   </div>

&#x20; );

}



export default App;

```



!image.png



\- `onClickCapture`는 캡처링 단계에서 부모 → 자식 순으로 실행

\- 타겟 요소(Child)의 `onClick`이 실행

\- `onClick`은 버블링 단계에서 자식 → 부모 순으로 실행



\---



\---



\# 상태 관리하기



\## State



시간에 따라 변할 수 있는 데이터이며, 컴포넌트의 현재 상태를 나타내는 값



!image.png



\- 값이 변경될 수 있음

\- 값이 변경되면 컴포넌트가 다시 렌더링

\- 사용자 입력, API 응답, 버튼 클릭 등의 변화에 사용



예시



```jsx

function Counter() {

&#x20; const \[count, setCount] = useState(0);



&#x20; return (

&#x20;   <>

&#x20;     <p>{count}</p>

&#x20;     <button onClick={() => setCount(count + 1)}>

&#x20;       증가

&#x20;     </button>

&#x20;   </>

&#x20; );

}

```



\*\*버튼을 누를 때마다 `count` 상태값이 증가하며 화면이 다시 렌더링!!!\*\*



강의 예제



```jsx

// useState는 React가 제공하는 Hook!!

import { useState } from "react";



function App() {

&#x20; const \[like, setLike] = useState(0); // 초기값이 0인 상태(State)를 생성

&#x20; 

&#x20; 

&#x20; const \[isHidden, setIsHidden] = useState(false); // 초기값이 false인 상태(State)를 생성

&#x20; 

&#x20; // useState의 반환값으로 부터 두 개의 값을 구조 분해를 통해 받을 수 있다!

&#x09;\*\*// 1. 상태의 현재 값 (보통 변수 이름)

&#x09;// 2. 상태를 업데이트 할 수 있는 함수\*\*

&#x09;//   - 기본적으로 상태를 선언한 컴포넌트에서 사용,

&#x20; //   - 필요하다면 Props를 통해 자식 컴포넌트에 전달할 수 있다



&#x20; return (

&#x20;   <div>

&#x20;     <p>

&#x20;       안녕하세요. 블로그 글입니다.

&#x20;       {isHidden ? (

&#x20;         <span>더보기...</span>

&#x20;       ) : (

&#x20;         <>

&#x20;           <br />

&#x20;           조금 긴 글입니다.

&#x20;           <br />

&#x20;           조금 긴 글입니다.

&#x20;           <br />

&#x20;           조금 긴 글입니다.

&#x20;         </>

&#x20;       )}

&#x20;     </p>



&#x20;     <div>좋아요 숫자: {like}</div>



&#x20;     <button

&#x20;       onClick={() => {

&#x20;         setLike(like + 1);

&#x20;       }}

&#x20;     >

&#x20;       좋아요 누르기

&#x20;     </button>



&#x20;     <button

&#x20;       onClick={() => {

&#x20;         setIsHidden(isHidden ? false : true);

&#x20;         // isHidden이 true면 false, false면 true

&#x20;       }}

&#x20;     >

&#x20;       {isHidden ? "펼치기" : "숨기기"}

&#x20;     </button>

&#x20;   </div>

&#x20; );

}



export default App;

```



\### 왜 필요한가?



컴포넌트는 현재 어떤 화면을 보여줄지 결정해야 한다.



\- A 화면을 보여줄지

\- B 화면을 보여줄지



로그인 화면이 컴포넌트라면, \*\*"로그인을 했는지"를 저장하는 값\*\*이 필요하며,



→ 이 값을 \*\*State\*\*라고 한다!!



위 예제를 다시 보면,



```jsx

function App() {

&#x20; return (

&#x20;   <div>

&#x20;     <Post /> // 이렇게 컴포넌트를 재사용해도

&#x20;     <Post /> // 각 컴포넌트는 독립적인 State를 지니므로 

&#x20;     <Post /> \*\*// 한 컴포넌트의 상태가 변경되도, 다른 컴포넌트의 상태에는 영향 X\*\*

&#x20;   </div>

&#x20; );

}

```



\---



\## Props



부모 컴포넌트가 자식 컴포넌트에게 전달하는 데이터 (읽기 전용)



!image.png



\*\*React에서 컴포넌트는 함수처럼 동작\*\*하며, Props는 함수의 매개변수와 비슷한 역할을 한다!!



```jsx

function Welcome(props) {

&#x20; return <h1>Hello, {props.name}</h1>;

}



// 부모 컴포넌트

function Parent() {

&#x20; return (

&#x20;   <>

&#x20;     <Child name="Jordan" />

&#x20;     // 이거 내부적으로 아래처럼 작동함..!

&#x09;    //  Child({

&#x09;		//	  name: "Jordan"

&#x09;		//  });

&#x20;   </>

&#x20; );

}



// 자식 컴포넌트

function Child({ name }) {

&#x20; return <p>Why is my name {name}?</p>;

}

```



→ 컴포넌트는 함수처럼 Props(객체)를 입력받아 React Element(UI)을 반환한다.

