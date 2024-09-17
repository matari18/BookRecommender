const itemsEndpoint = '/books';
const processItemEndpoint = '/recommend';

let items = [];

// Получение списка элементов с бэкенда
fetch(itemsEndpoint)
    .then(response => response.json())
    .then(data => {
        items = data;
        displayItems(items);
    });

const searchInput = document.getElementById('search');
const itemList = document.getElementById('item-list');
const resultDiv = document.getElementById('result');
const outputDiv = document.getElementById('output'); // Новый элемент для отображения результата

// Обработчик поиска
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(query)
    );
    displayItems(filteredItems);
});

// Функция отображения списка элементов
function displayItems(itemArray) {
    itemList.innerHTML = '';
    itemArray.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        li.addEventListener('click', () => {
            processSelectedItem(item);
        });
        itemList.appendChild(li);
    });
}

// Функция отправки POST-запроса при выборе элемента
function processSelectedItem(itemName) {
    fetch(processItemEndpoint + '?'
    + new URLSearchParams({item_name: itemName}).toString(),
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text) })
        }
        return response.json();
    })
    .then(data => {
        displayResult('');// Очищаем сообщения об ошибках
        displayOutput(data); // Отображаем результат обработки
    })
    .catch(error => {
        console.error('Ошибка:', error);
        displayResult('Произошла ошибка при обработке запроса.');
        displayOutput(''); // Очищаем поле результата при ошибке
    });
}

// Функция отображения сообщений (ошибки, уведомления)
function displayResult(message) {
    resultDiv.textContent = message;
}

// Новая функция отображения результата обработки
function displayOutput(items) {
    outputDiv.textContent = '';
    items.map((item) => {
        const node = document.createElement('p');
        const textnode = document.createTextNode(item);
        node.append(textnode);
        document.getElementById("output").appendChild(node);
    })
}