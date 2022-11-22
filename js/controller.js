const controller = (function(budgetCtrl, uiCtrl){

    
    const setupEventListeners = function() {
        const DOM = uiCtrl.getDomStrings();
        document.querySelector(DOM.form).addEventListener('submit', ctrlAddItem);

        // Клик по таблице с расходами и доходами
        document.querySelector(DOM.budgetTabl).addEventListener('click', ctrlDeleteItem)
    }

    // Обновляем % у каждой записи
    function updataPercentages(){

        // Посчитаем % для каждой записи типа Expense
        budgetCtrl.calculatePercentage();
        budgetCtrl.test();

        // Получаем данные по % с модели
        const idsAndPercents = budgetCtrl.getAllIdsAndPercentages();
        console.log("🚀 ~ file: controller.js ~ line 21 ~ updataPercentages ~ idsAndPercents", idsAndPercents)

        // Обновляем UI с новыми %
        uiCtrl.updateItemPercentages(idsAndPercents);

    }

    // Ф-ия срабатывает при отправке формы
    function ctrlAddItem(event){
        event.preventDefault();

        // Получить все данные из формы
        let input = uiCtrl.getInput();


        // Проверка на пустыеь поля
        if (input.description !== '' && !isNaN(input.value) && input.value > 0) {

            // Добавить полученные данные в модель
            const newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            budgetCtrl.test()
    
            // Добавить "запись" в UI
            uiCtrl.renderListItem(newItem, input.type);
            uiCtrl.clearFilds();
            generateTestData.init();
            
            // Посчитать бюджет
            updateBudget();

            // Пересчитали %
            updataPercentages();
        };


    };

    function ctrlDeleteItem(event) {
        let itemID, splitID, type, ID;
        
        if(event.target.closest('.item__remove')) {

            // Находим id которую надо удалить
            itemID = event.target.closest('li.budget-list__item').id;
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // Удалить запись из модели
            budgetCtrl.deleteItem(type, ID);

            // Удалить запись из шаблона
            uiCtrl.deleteListItem(itemID);

            // Посчитать бюджет
            updateBudget();       
            
            // Пересчитали %
            updataPercentages();

        }
    };

    function updateBudget() {
        // Расчитать бюджет в модели
        budgetCtrl.calculateBudget();

        // Получить расчитанный бюджет из модели
        let budgetObj = budgetCtrl.getBudget();

        // Отобразить бюджет в шаблоне
        uiCtrl.updataBudget(budgetObj);
    };

    return {
        init: function(){
            uiCtrl.displayMonth();
            setupEventListeners();
            uiCtrl.updataBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            })
        }
    };

})(modelController, viewController);

controller.init();