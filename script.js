const tableBody = document.querySelector('.table__body');
let dataBase = [];
// добавление пользователя
function addUser() {
    function dataInput(id, firstName, lastName, email, phone) {
        // поля ввода данных с условиями
        function inputID(id) {
            id = prompt('Впишите ID пользователя');
            if (id.length == 0) {
                alert('Ваша строка пуста');
                return inputID();
            }
            else if (isNaN(id)) {
                alert('ID Может содержать только цифры');
                return inputID();
            }
            return id;
        };
        
        function inputFirstName(firstName) {
            firstName = prompt('Впишите firstName пользователя');
            if (firstName.length <= 2) {
                alert('Разрешенно минимум 3 символа');
                return inputFirstName();
            }
            else if (isNaN(firstName)) {
                if (/\d/.test(firstName)) {
                    alert('Цифры в имени не допускаются');
                    return inputFirstName();
                }
                return firstName;   
            }
            else {
                alert('Цифры в имени не допускаются');
                return inputFirstName();
            }
        };
        
        function inputLastName(lastName) {
            lastName = prompt('Впишите LastName пользователя');
            if (lastName.length <= 2) {
                alert('Разрешенно минимум 3 символа');
                return inputLastName();
            }
            else if (isNaN(lastName)) {
                if (/\d/.test(lastName)) {
                    alert('Цифры в имени не допускаются');
                    return inputLastName();
                }
                return lastName;   
            }
            else {
                alert('Цифры в имени не допускаются');
                return inputLastName();
            }
        };
        
        function inputEmail(email) {
            email = prompt('Впишите email пользователя');
            if (email.length <= 3) {
                alert('Разрешенно минимум 4 символа');
                return inputEmail();
            }
            else {
                return email;
            }
        };
        
        function inputPhone(phone) {
            phone = prompt('Впишите номер телефона пользователя');
            if (phone.length <= 4) {
                alert('Разрешенно минимум 5 символов');
                return inputPhone();
            }
            else if (isNaN(phone)) {
                alert('Номер телефона может содержать только цифры');
                return inputPhone();
            }
            return phone;
        };
        // сохраняем результаты в константы
        const infoID = inputID(id);
        const infoFirstName = inputFirstName(firstName);
        const infoLastName = inputLastName(lastName);
        const infoEmail = inputEmail(email);
        const infoPhone = inputPhone(phone);
        // прописываем функцию конструктор который вернёт объект
        function UserInfo(infoID, infoFirstName, infoLastName, infoEmail, infoPhone) {
            this.id = infoID,
            this.firstName = infoFirstName,
            this.lastName = infoLastName,
            this.email = infoEmail,
            this.phone = infoPhone
        };
        // создаём новый объект через конструктор с теми данными которые в константах
        const user = new UserInfo(infoID, infoFirstName, infoLastName, infoEmail, infoPhone);
        // добавляем объект в dataBase
        dataBase.push(user);    
        // вызываем функцию которая добавит наши данные в таблицу
        return createTableList(user);

    };

    function createTableList(user) {
    // создание элементов
    const newTableList = document.createElement('div');

    const tableId = document.createElement('div');
    const tableFirstName = document.createElement('div');
    const tableLastName = document.createElement('div');
    const tableEmail = document.createElement('div');
    const tablePhone = document.createElement('div');

    newTableList.append(tableId);
    newTableList.append(tableFirstName);
    newTableList.append(tableLastName);
    newTableList.append(tableEmail);
    newTableList.append(tablePhone);

    // наделение классами

    newTableList.className = 'table__list';

    tableId.className = 'table__list-id';
    tableFirstName.className = 'table__list-firstName';
    tableLastName.className = 'table__list-lastName';
    tableEmail.className = 'table__list-email';
    tablePhone.className = 'table__list-phone';

    // наделение содержимым
    tableId.innerHTML = user.id;
    tableFirstName.innerHTML = user.firstName;
    tableLastName.innerHTML = user.lastName;
    tableEmail.innerHTML = user.email;
    tablePhone.innerHTML = user.phone;
    // добавляем атрибут id к родительскому элементу.
    // значение берём из колонки id
    newTableList.setAttribute('id', tableId.innerHTML);
    // --------------------------------------------------------
    // добавляем в нашу таблицу
    return addTableList(newTableList);
    };

    function addTableList(newTableList) {
        tableBody.prepend(newTableList);
    };
    dataInput();
}

// кнопка вызова функции добавления пользователя
const buttonAddUser = document.querySelector('.button__addUser');
buttonAddUser.addEventListener('click', function(event) {
    addUser();    
});
// ==========================================================================================
// ==========================================================================================
// ==========================================================================================
// Оптимизирован
// удаление пользователя
function removeUser() {
    const id = prompt('Введите ID пользователя которого хотите удалить');
    // если пользователь с таким id есть то выполняем код
    // если же нет то браузер выведет уведомление что 'Пользователь не найден'
    if (document.getElementById(id)) {
        // получаем элементы из базы данных и таблицы
        // находим пользователя в базе данных по ключу id со значением которым мы ввели в id
        const gettingInformation = dataBase.find(item => item.id == id);
        // так же находим пользователя в таблице по атрибуту id со значением которым мы ввели в id
        const gettingElement = document.getElementById(id);

        // подтверждение удаления пользователя
        // выводим данные нашего пользователя и подтверджаем удаление
        const confirmation = confirm(`удалить данного пользователя?
        ID: ${gettingInformation.id}
        firstName: ${gettingInformation.firstName}
        lastName: ${gettingInformation.lastName}
        email: ${gettingInformation.email}
        phone: ${gettingInformation.phone}`);

        // функция удаление пользователя из базы данных и таблицы
        function completeRemoval(id) {
            // получаем позицию пользователя в базе данных по ключу id: с нашим значением который мы вводили в prompt
            const gettinAPosition = dataBase.findIndex(item => item.id == id);
            // получив его позицию выполняем удаление по его позиции из базы данных
            dataBase.splice(gettinAPosition, 1);
            // удаляем пользователя из таблицы
            gettingElement.remove();
        };
        // если мы подтвердили удаление, то вызываем функцию удаления
        // если же нет, то функция завершается.
        if (confirmation) {
            return completeRemoval(id);
        }
        else {
            return false;
        };
    }
    else {
        return alert('Пользователь не найден');
    }
};

// кнопка вызова функции удаления пользователя
const buttonRemoveUser = document.querySelector('.button__removeUser');
buttonRemoveUser.addEventListener('click', function(event) {
    removeUser();
});
// ============================================================================================
// ============================================================================================
// ============================================================================================
// Оптимизирован
// выведения инфо пользователя под таблицей по клику на него
// и выделения его цветом
// присваиваем каждый блок в константы
const tableInfo = document.querySelector('.table__info');
const tableInfoHeading = document.querySelector('.table__info-heading');
const tableInfoId = document.querySelector('.table__info-id');
const tableInfoFirstName = document.querySelector('.table__info-firstName');
const tableInfoLastName = document.querySelector('.table__info-lastName');
const tableInfoEmail = document.querySelector('.table__info-Email');
const tableInfoPhone = document.querySelector('.table__info-phone');

// Добавляем обработчик событий на tableBody
tableBody.addEventListener('click', function (event) {
    const target = event.target;
    // От элемента которого мы кликнули находим ближащий родительский элемент table__list
    const tableList = target.closest('.table__list');
    // Если такой элемент не найден, то мы прекращаем выполнение функции.
    // Если же он найден то мы точно кликнули на дочерний элемент table__list
    if (!tableList) {
        return;
    }
    
    // Получаем родителя элемента на которого мы кликнули (table__list)
    const parentElement = target.parentNode;
    // Получаем у родителя значение атрибута id
    const id = parentElement.getAttribute('id');
    // Вызываем функцию которая выделяет текующий элемент (нашего пользователя в таблице)
    // и которая выводит информацию о пользователе
    toggleClass(parentElement);
    return userInformation(id);
});

// Функция выделения цвета пользователя по клику
// перетаскивая класс marked с селектора на селектор
function toggleClass(element) {
    // Находим ранее выделенный элемент
    let previosElement = document.querySelector('.marked');
    // Если такой элемент существует, удаляем класс marked
    if (previosElement) {
        previosElement.classList.remove('marked');
    }
    // Добавляем класс marked к новому элементу
    element.classList.add('marked');
};

// функция вывода информации о пользователе
function userInformation(id) {
    // Находим индекс элемента в массиве dataBase по id
    const userPosition = dataBase.findIndex(item => item.id == id);
    // Выводим информацию о пользователе в соответствующие блоки
    tableInfoId.innerHTML = `ID: ${dataBase[userPosition].id}`;
    tableInfoFirstName.innerHTML = `firstName: ${dataBase[userPosition].firstName}`;
    tableInfoLastName.innerHTML = `lastName: ${dataBase[userPosition].lastName}`;
    tableInfoEmail.innerHTML = `email: ${dataBase[userPosition].email}`;
    tableInfoPhone.innerHTML = `phone: ${dataBase[userPosition].phone}`;
};
























