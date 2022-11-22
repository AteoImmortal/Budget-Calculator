const modelController = (function(){

    const Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    const Expanse = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expanse.prototype.calcPercentage = function(totalIncome) {
        if ( totalIncome > 0 ) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        };
    };

    Expanse.prototype.getPercentage = function(){
        return this.percentage;
    };

    function addItem(type, desc, val){
        let newItem, id;

        // Генерируем id
        if (data.allItems[type].length > 0) {
            const lastIndex = data.allItems[type].length - 1;
            id = data.allItems[type][lastIndex].id + 1;

        } else {
            id = 0;
        }
        
        // В зависимости от типа записи используем соответствующий конструктор и создаем объект
        if ( type ==='inc') {
            newItem = new Income(id, desc, parseFloat(val));
        } else if ( type === 'exp') {
            newItem = new Expanse(id, desc, parseFloat(val));
        }

        // Записываем "запись" / объект в нашу структуру данных
        data.allItems[type].push(newItem);

        // Возвращаем новый объект
        return newItem;

    };

    function deleteItem(type, id){

        // Находим запись по ID в массиве с Доходами или расходами
        const ids = data.allItems[type].map(function(item){
            return item.id;
        });

        index = ids.indexOf(id);

        // Удалить найденную запись из массива по индексу
        if (index !== -1){
            data.allItems[type].splice(index, 1);
        }

        

    };

    function calculateTotalSum(type) {
        let sum = 0;

        data.allItems[type].forEach(function(item){
            sum = sum + item.value;
        });

        return sum;
    };

    function calculateBudget() {
        // Посчитать все Доходы
        data.totals.inc = calculateTotalSum('inc'); 

        // Посчитать все Расходы
        data.totals.exp = calculateTotalSum('exp');

        // Посчитали общий Бюджет
        data.budget = data.totals.inc - data.totals.exp;

        // Посчитали % для расходов
        if(data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
        } else {
            data.percentage = -1;
        }
    };

    function getBudget() {
        return {
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
    };

    function calculatePercentage() {
        data.allItems.exp.forEach(function(item) {
            item.calcPercentage(data.totals.inc);
        });
    };

    function getAllIdsAndPercentages() {

        let allPerc = data.allItems.exp.map(function(item) {
            return [item.id, item.getPercentage()];
        });

        return allPerc;
    };

    const data = {
        allItems: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: -1
    };

    return {
        getAllIdsAndPercentages: getAllIdsAndPercentages,
        calculatePercentage: calculatePercentage,
        calculateBudget: calculateBudget,
        addItem: addItem,
        getBudget: getBudget,
        deleteItem: deleteItem,
        test: function(){
            console.log(data);
        }
    };

})();