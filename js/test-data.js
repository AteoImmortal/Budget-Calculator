const generateTestData = (function(){
    const ExampleItem = function(type, desc, sum){
        this.type = type;
        this.desc = desc;
        this.sum = sum;
    }
    
    const testData = [
        new ExampleItem('inc', 'з/п', 1023),
        new ExampleItem('inc', 'Фриланс', 1244),
        new ExampleItem('inc', 'Продажи', 214),
        new ExampleItem('inc', 'Долги', 1224),
        new ExampleItem('exp', 'Рента', 543),
        new ExampleItem('exp', 'Бензин', 1245),
        new ExampleItem('exp', 'Продукты', 1257),
        new ExampleItem('exp', 'Развлечения', 213),
    ]
    
    function getRandomInt(max){
        return Math.floor(Math.random() * max);
    }
    
    
    function insertIntUI() {
        let random = getRandomInt(testData.length);
        let randomItem = testData[random];
    
        document.querySelector('#input__type').value = randomItem.type;
        document.querySelector('#input__description').value = randomItem.desc;
        document.querySelector('#input__value').value = randomItem.sum;
    }
    
    return {
        init: insertIntUI
    }
})();

generateTestData.init();
