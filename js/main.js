'use strict'

let money = +prompt("Ваш месячный доход?");
let income = "фриланс";
let addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую");
let deposit = confirm('Есть ли у вас депозит в банке?');    
let mission = 1000000;
const period = 12;
let budgetMonth, budgetDay; /* переменные бюджета по перидам */
// Дополнительные статьи расходов
let exp1 = prompt("Введите обязательную статью расходов?");
let cost1 = +prompt("Во сколько это обойдется?");
let exp2 = prompt("Введите обязательную статью расходов?");
let cost2 = +prompt("Во сколько это обойдется?");


//                  Блок описания функций
//Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth(a, b){
    return a + b;
}

//Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth(mon, getExp){
    return mon - getExp;
}

//Функция, подсчитывает за какой период будет достигнута цель
function getTargetMonth(mis, accMon){
    return Math.ceil(mis / accMon);
}

//Функция вывода типа данных
let showTypeOf = function(data){
    console.log(data, typeof (data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// Расчет бюджета по периодам, дополнительно нахождение количества месяцев для достижения заданной цели
let expensesMonth = getExpensesMonth(cost1,cost2); // сумма обязательных расходов
//переменной expensesMonth нет в задании, но ее же можно ввести, чтоб не повторять вызов фукнции?

console.log(expensesMonth); 
console.log(addExpenses.toLowerCase().split(', ')); // массив доп расходов

let accumulatedMonth = getAccumulatedMonth(money, expensesMonth); // доход за месяц
console.log("Доход за месяц:", accumulatedMonth );
console.log(`Цель будет достигнута за ${getTargetMonth(mission, accumulatedMonth)} месяцев(-а)`);
budgetDay = Math.floor( accumulatedMonth / 30);
console.log("Бюджет на день: ", budgetDay);

//Вывод информации для пользователя
let getStatusIncome = function(){
    if (budgetDay >= 1200) {
        return("У вас высокий уровень дохода");
    } else if ((budgetDay >= 600)&&(budgetDay < 1200)) {
        return("У вас средний уровень дохода");
    } else if ((budgetDay > 0) && (budgetDay < 600)) {
        return("К сожалению, у вас уровень дохода ниже среднего");
    } else {
        return("Что-то пошло не так"); 
    }  
}

console.log(getStatusIncome());            