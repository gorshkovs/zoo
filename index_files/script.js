const showMenu=function (evt){   //задаем новую переменную с функцией обработки события
    const parent = evt.target.parentNode; // запись ссылки на родителя текущего элемента в константу parent
    const addMenu = parent.querySelector('.choose-elem'); // поиск класса choose-elem в константе parent и запись его в константу addMenu
    addMenu.classList.toggle('hidden'); // добавления класса hidden для константы addMenu
}
const addButtonElements = document.querySelectorAll('.add-btn'); // поиск класса add-btn по всему документу и запись его в константу addButtonElements
addButtonElements.forEach(function (item){ //последовательно выполнить функцию
 return item.addEventListener('click', showMenu); //возврат событие item при клике на showMenu
});

const deleteButton = function (evt){ // задает константу deleteButton с функцией обработки  события
    const divElement = evt.target.parentNode; // запись ссылки на родителя текущего элемента в константу divElement
    const divWrapper = divElement.parentNode; //запись родителя divElement в константу divWrapper
    const block = divWrapper.parentNode; //запись родителя divWrapper в константу block
    divElement.remove(); // возврат divElement

    const wrapperItems = divWrapper.querySelectorAll('.element'); //поиск класса element в константе divWrapper и запись в константу wrapperItems
    if (wrapperItems.length ===0){ //если длина wrapperItems строго равно 0
        if (block.classList.contains('header')){ //если block с контентом имеет класс header
            block.classList.add('header--empty'); //то block добавляем класс header--empty
        }
        if (block.classList.contains('content')){ //если block имеет класс content
            block.classList.add('content--empty'); //то в block добавляем класс content--empty
        }
        if (block.classList.contains('footer')){ //если block имеет класс footer
            block.classList.add('footer--empty'); //то в blосk добавляем класс footer-empty
        }
    }
};

const changeLayout = function (evt){ //задаем константу changeLayout с функцией обработки события
const newLayout = evt.target.value; //запись текущего значения в константу newLayout
const layoutElement = document.querySelector('.layout'); //поиск по всему документу класса layout и запись его в константу layoutElement
layoutElement.classList.remove('layout--landing'); //возвращаем класс layout--landing
layoutElement.classList.remove('layout--blog'); //возвращаем класс layout--blog
layoutElement.classList.remove('layout--shop'); //возвращаем класс layout--shop
layoutElement.classList.add('layout--' + newLayout); //добавляем класс layout + константа newLayout
};
const chooseButtonElements = document.querySelectorAll('.choose-elem__btn'); //поиск по всему документу класса choose-elem__btn и запись в константу
document.querySelector('.grid-select').addEventListener('change', changeLayout); //поиск класса grid-select после окончания события changeLayout

const editContent = function (evt){ //задаем константу editContent с функцией обработки события
    const editElement = evt.target; //запись текущего значения в константу editElement
    let oldValue; //переменная oldValue
    if (editElement.tagName === 'IMG'){ //если editElement содержит название IMG
        oldValue = editElement.src; //oldValue принимает значение новой ссылки
    }
    else{ //иначе
        oldValue = editElement.textContent; //oldValue принимает новое текстовое значение
    }
    const newValue = window.prompt('Напишите новый текст', oldValue); //появление окошка с заголовком и значением oldValue
    if (editElement.tagName === 'IMG'){ //если editElement содержит название IMG
        editElement.src = newValue; //editElement принимает значения(ссылку на картинку) newValue
    }
    else { //иначе
        editElement.textContent = newValue; //editElement принимает значения(текствое значение) newValue
    }
};

const addElement = function (evt){ //задаем константу addElement с функцией обработки события
    const clickedButton = evt.target; // найдем нажатую кнопку
    const chooseElem = clickedButton.parentNode; //запись родителя clickedButton в константу chooseElem
    chooseElem.classList.add('hidden'); //добавления класса hidden константе chooseElem

    const blockType = clickedButton.dataset.type; //записываем в константу тип нажатой кнопки
    const blockContainer = clickedButton.dataset.container; //записывыаем в константу контейнер где нажали кнопку

    const Template = document.querySelector('#' + blockType + '-template').content; //поиск по всему документу id и запись его в константу
    const Clone = Template.cloneNode(true); //разрешаем создавать копии template и записываем в константу
    const templateElement = Clone.querySelector('.element'); //поиск в константе Clone класса element и запись в константу
    const Wrapper = document.querySelector('.' + blockContainer + '__elements-wrapper'); //поиск по всему документу класса и запись его в константу
    Wrapper.append(Clone); //вставляем элемент Clone после элемента Wrapper

    if (blockContainer.includes('content')){ //если blockContainer содержит content
        Wrapper.parentNode.classList.remove('content--empty'); //у Wrapper возвращаем класс content--empty
    }
    else { //иначе
    Wrapper.parentNode.classList.remove(blockContainer + '--empty'); //у Wrapper возвращаем класс
    }
 templateElement.querySelector('.delete-btn').addEventListener('click', deleteButton); //поиск класса delete-btn и добавляем дейсвие по клику deleteButton

    templateElement.querySelector('.template-content').addEventListener('dblclick',editContent); //поиск класса template-content и добавления действия по двойному клику editContent
};
chooseButtonElements.forEach(function (item){ //добавляем функцию, которая будет выполняться один раз для каждого элемента
    return item.addEventListener('click', addElement); //возвращение addElement по повторному нажатию
 });




