const viewController = (function(){
    const DOMstrings = {
        inputType: '#input__type',
        inputDescription: '#input__description',
        inputValue: '#input__value',
        form: '#budget-form',
        incomeContainer: '#income__list',
        expenseContainer: '#expenses__list',
        budgetLabel: '#budget-value',
        incomLabel: '#incom-label',
        expenseLabel: '#expense-label',
        expensesPercentLabel: '#expense-percent-label',
        budgetTabl: '#budget-table',
        monthLabel: '#month',
        yearLabel: '#year'
        }

    function getInput() {
        return {
            type: document.querySelector(DOMstrings.inputType).value,
            description: document.querySelector(DOMstrings.inputDescription).value,
            value: document.querySelector(DOMstrings.inputValue).value,
        }
    };

    function formatNumber(num, type) {
        let numSplit, int, dec, newInt, resultNumber;

        // Убираем знак '-' у отрицательных чисел
        num = Math.abs(num);

        // Приводим к 2-м цифрам после точки
        num = num.toFixed(2);

        numSplit = num.split('.');
        // Целая часть
        int = numSplit[0];
        // Десятые от исходной строки
        dec = numSplit[1];

        // Расставляем запятые 
        // Исходя из длинны числа делим его на части по 3 цифры
        // Начиная с правой стороны проставляем запятые после каждого третьего числа
        // Если длинна номера более чем 3 цифры значит надо ставить запятые
        if(int.length > 3) {
            newInt = '';

            // console.log("🚀 ~ file: view.js ~ line 42 ~ formatNumber ~ int.length", int.length);

            for( let i = 0; i < int.length / 3; i++ ) {
                // console.log("🚀 ~ file: view.js ~ line 45 ~ formatNumber ~ i", i);

                // Формирую новую строку с номером
                newInt =
                // Добавляю запятую каждые 3 числа
                "," +
                // Вырезанный кусок из исходной строки
                int.substring(int.length - 3 * (i + 1), int.length - 3 * i) +
                // Конец строки, правая часть
                newInt;
                
                // console.log("🚀 ~ file: view.js ~ line 49 ~ formatNumber ~ newInt", newInt)
            }
            // console.log("🚀 ~ file: view.js ~ line 49 ~ formatNumber ~ newInt", newInt)

            // Убираем запятую в начале, если она есть
            if(newInt[0] === ',') {
                newInt = newInt.substring(1);
            }

        // Если исходное число равно 0, то в новую строку записываем 0    
        } else if (int === '0') {
            newInt = '0';
        // Если исходное число имеет 3 и менее символов
        } else {
            newInt = int;
        }

        resultNumber = newInt + '.' + dec;

        if(type === 'exp')  {
            resultNumber = '- ' + resultNumber;
        } else if(type === 'inc') {
            resultNumber = '+ ' + resultNumber;
        }

        return resultNumber;
    };

    function renderListItem(object, type){
        let containerElement, html;

        if ( type === 'inc') {
            containerElement = DOMstrings.incomeContainer;
            html = `<li id="inc-%id%" class="budget-list__item item item--income">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">%value%</div>
                            <button class="item__remove">
                                <img
                                    src="./img/circle-green.svg"
                                    alt="delete"
                                />
                            </button>
                        </div>
                    </li>`
        } else {
            containerElement = DOMstrings.expenseContainer;
            html = `<li id="exp-%id%" class="budget-list__item item item--expense">
                        <div class="item__title">%description%</div>
                        <div class="item__right">
                            <div class="item__amount">
                                %value%
                                <div class="item__badge">
                                    <div class="item__percent badge badge--dark">
                                        15%
                                    </div>
                                </div>
                            </div>
                            <button class="item__remove">
                                <img src="./img/circle-red.svg" alt="delete" />
                            </button>
                        </div>
                    </li>`
        }

        newHtml = html.replace('%id%', object.id);
        newHtml = newHtml.replace('%description%', object.description);
        newHtml = newHtml.replace('%value%', formatNumber(object.value, type));

        document.querySelector(containerElement).insertAdjacentHTML('beforeend', newHtml);
    };

    function clearFilds(){
        let inputDesc, inputVal;

        inputDesc = document.querySelector(DOMstrings.inputDescription);
        inputVal = document.querySelector(DOMstrings.inputValue);

        inputDesc.value = '';
        inputDesc.focus();
        
        inputVal.value = '';
    };

    function updataBudget(obj) {
        let type;

        if(obj.budget > 0) {
            type = 'inc';
        } else {
            type = 'exp';
        }

        document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
        document.querySelector(DOMstrings.incomLabel).textContent = formatNumber(obj.totalInc, 'inc');
        document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');

        if (obj.percentage > 0) {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = obj.percentage;
        } else {
            document.querySelector(DOMstrings.expensesPercentLabel).textContent = '--';
        }

    };

    function deleteListItem(itemID) {
        document.getElementById(itemID).remove();
    };

    function updateItemPercentages(items) {
        
        items.forEach(item => {
            // Выводим каждую запись массива во время прохода
            let el = document.getElementById(`exp-${item[0]}`).querySelector('.item__percent');

            if(item[1] >= 0) {
                el.parentElement.style.display = 'block';
                
                el.textContent = item[1] + '%';
            } else {
                el.parentElement.style.display = 'none';
            };


        });
    };

    function displayMonth() {
        let now, year, month

        now = new Date();
        year = now.getFullYear();
        month = now.getMonth();

        monthArr = [
            'Январь', 'Феваль', 'Март', 
            'Апрель', 'Май', 'Июнь', 
            'Июль', 'Август', 'Сентябрь', 
            'Октябрь', 'Ноябрь', 'Декабрь'
        ];

        month = monthArr[month];
        document.querySelector(DOMstrings.monthLabel).innerText = month;
        document.querySelector(DOMstrings.yearLabel).innerText = year;
    }

    return {
        displayMonth: displayMonth,
        updateItemPercentages: updateItemPercentages,
        deleteListItem: deleteListItem,
        getInput: getInput,
        renderListItem: renderListItem,
        clearFilds: clearFilds,
        updataBudget: updataBudget,
        getDomStrings: function(){
            return DOMstrings;
        }
    };
})();