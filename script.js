// Крестики-нолики
const cells = document.querySelectorAll('.cell');
let currentPlayer = 'X';

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (cell.textContent === '') {
            cell.textContent = currentPlayer;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    });
});

// Калькулятор цвета
document.getElementById('color-btn-example').addEventListener('click', () => {
    document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);
});

// Список желаний
document.getElementById('add-wish-example').addEventListener('click', () => {
    const input = document.getElementById('wish-input-example');
    const wish = input.value;
    if (wish) {
        const li = document.createElement('li');
        li.textContent = wish;
        document.getElementById('wish-list-example').appendChild(li);
        input.value = '';
    }
});

// Обработка формы для домашнего задания
document.getElementById('upload-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const file = document.getElementById('file').files[0];

    if (!name || !surname || !file) {
        alert('Заполните все поля и выберите файл!');
        return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('file', file);

    try {
        const response = await fetch('https://webprof.unpe.ru/upload.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            alert(result.message);
            document.getElementById('upload-form').reset();
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        alert('Ошибка при отправке: ' + error.message);
    }
});