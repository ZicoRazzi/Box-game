var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $result = document.querySelector('#result')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $gameTime = document.querySelector('#game-time')

var colors = ['#FDEB71', '#0396FF', '#EA5455', '#7367F0', '#32CCBC', '#F6416C', '#28C76F', '#9F44D3', '#623AA2', '#F55555', '#A0FE65', '#0E197D']
var score = 0 // gaat tellen hoeveel keer was geklikt op de box
var isGameStarted = false

$start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)

function show($el) {
  $el.classList.remove('hide')
}
function hide($el) {
  $el.classList.add('hide')
}


function startGame () {
  score = 0
  setGameTime()
  $gameTime.setAttribute('disabled', 'true')
  isGameStarted = true
  $game.style.backgroundColor = '#fff'
  hide($start)

  var interval = setInterval(function() {
    var time = parseFloat($time.textContent) 

    if (time <= 0) {
      // end of game
      clearInterval(interval) //methode clearInterval stopt interval 
      endGame()
    } else {
      $time.textContent = (time - 0.1).toFixed(1) // 0.1 = 100 ms. Met .toFixed(1) komt een cijfer na komma
    }
    /*
    The setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds).

The setInterval() method will continue calling the function until clearInterval() is called, or the window is closed.

The ID value returned by setInterval() is used as the parameter for the clearInterval() method.

Tip: 1000 ms = 1 second.

Tip: To execute a function only once, after a specified number of milliseconds, use the setTimeout() method.
    */
    console.log('interval', $time.textContent)

  }, 100) // na de komma staat een getal voor aantal milliseconde 

  

  renderBox() //bij het klikken start renderBox functie gaat ook opstarten
}

function setGameScore () {
  $result.textContent = score.toString()
}
function setGameTime () {
  var time = +$gameTime.value
  $time.textContent = time.toFixed(1)
  show($timeHeader)
  hide($resultHeader) 
}
function endGame () {
  isGameStarted = false
  setGameScore ()
  show($start) //show ipv .classList.remove('hide') //na het eind van de game button komt terug
  $gameTime.removeAttribute('disabled')
  $game.innerHTML = '' // alle boxes weg
  $game.style.backgroundColor = '#CCC' // komt de start achtergrond terug
  hide($timeHeader) //.classList.add('hide') //
  show($resultHeader) //.classList.remove('hide')
}
function handleBoxClick (event) { //event omdat we klikken op de box
  if (!isGameStarted) {
    return
  }
  if (event.target.dataset.box) { //als er een object 'box' in het veld dataset is betekent we hebben gekikt op de zwarte box
    score++ // en bij elke click komt een plusje bij
    renderBox() // dus bij click gaat de functie renderBox aan het werk
  }
}
function renderBox () { //deze functie genereert willekeurig de boxen in het speelboord 
  
  $game.innerHTML = '' // innerHTML = "";  // Заменяет содержимое тела пустой строкой. Dit doen we voor html conteiner schoon houden bij elke klik op de zwarte box.
  var box = document.createElement('div') //createElement В HTML-документах создаёт элемент c тем тегом, что указан в аргументе или
  var boxSize = getRandom(30, 100)
  var gameSize = $game.getBoundingClientRect() // Метод Element.getBoundingClientRect() возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим). Return the size of an element and its position relative to the viewport:
  var maxTop = gameSize.height - boxSize
  var maxLeft = gameSize.width - boxSize
  //[1,2,3] -> length == 3
  var randomColorIndex = getRandom(0, colors.length)
  //var randomColor = Math.floor(Math.random()*16777215).toString(16);
  
  box.style.height = box.style.width = boxSize + 'px' //omdat box vierkant is height en width zijn samen
  box.style.position = 'absolute' // div 'game' heeft relatieve, daarom box is absolute
  box.style.backgroundColor = colors[randomColorIndex] //'#' + randomColor // eerst #000/zwart daarna veranderen dynamisch
  box.style.top = getRandom(0, maxTop) + 'px'
  box.style.left = getRandom(0, maxLeft) + 'px'
  box.style.cursor = 'pointer'
  box.setAttribute('data-box', true) //

  $game.insertAdjacentElement('afterbegin', box) //Метод insertAdjacentElement() добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.
  //targetElement ($game).insertAdjacentElement(position ('afterbegin'), element (in dit geval element 'box'));

}

function getRandom (min, max) { //geeft de waarde van een getal in een bepaald bereik, dit gebeurt met de hulp van parameter min en max (bepaald bereik)
  return Math.floor(Math.random() * (max - min) + min) //Math.floor maakt een heel getaal 
}





/*
Element.insertAdjacentElement()
Метод insertAdjacentElement() добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.

Синтаксис
targetElement.insertAdjacentElement(position, element);
Параметры
position
DOMString - определяет позицию добавляемого элемента относительно элемента, вызвавшего метод. Должно соответствовать одному из следующих значений (чувствительно к регистру):
'beforebegin': перед самим элементом targetElement.
'afterbegin': внутри элемента targetElement, перед его первым потомком.
'beforeend': внутри элемента targetElement, после его последнего потомка.
'afterend': после самого элемента targetElement.
element
Элемент, добавляемый в DOM-дерево.
*/
/*
Доступ в JavaScript
Чтение data-атрибутов в JavaScript осуществляется также просто. Для этого можно использовать метод getAttribute() с параметром, равным полному имени атрибута. Но есть и более простой способ, используя объект dataset (en-US).

Чтобы получить data-атрибут можно взять свойство объекта dataset с именем, равным части имени атрибута после data- (обратите внимание, что дефисы в имени преобразуются в camelCase).

var article = document.getElementById('electriccars');

article.dataset.columns // "3"
article.dataset.indexNumber // "12314"
article.dataset.parent // "cars"
Каждое свойство является строкой и может быть прочитано и записано. В приведённом выше примере выполнение кода article.dataset.columns = 5 приведёт к тому, что новое значение атрибута станет равным "5".
*/