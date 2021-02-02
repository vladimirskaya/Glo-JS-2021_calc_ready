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
let cost1 = prompt("Во сколько это обойдется?");
let exp2 = prompt("Введите обязательную статью расходов?");
let cost2 = prompt("Во сколько это обойдется?");

//Блок описания функций

//Функция возвращает сумму всех обязательных расходов за месяц
function getExpensesMonth(a,b){
    return a + b;
}

//Функция возвращает Накопления за месяц (Доходы минус расходы)
function getAccumulatedMonth(mon,getExp){
    return mon - getExp();
}

console.log(`Тип переменной money: ${typeof money}`);
console.log(`Тип переменной income: ${typeof income}`);
console.log(`Тип переменной deposit: ${typeof deposit}`);
console.log(`Длина строки addExpenses: ${addExpenses.length}`);
console.log(`Период равен: ${period} месяцев`);
console.log(`Цель: заработать ${mission} рублей`);
console.log(addExpenses.toLowerCase().split(', '));

// Расчет бюджета по периодам, дополнительно нахождение количества месяцев для достижения заданной цели
let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth, cost1, cost2);
budgetMonth = money - cost1 - cost2;
console.log("Бюджет на месяц:", budgetMonth );
console.log(`Цель будет достигнута за ${Math.ceil(mission / budgetMonth)} месяцев(-а)`);
budgetDay = Math.floor(budgetMonth / 30);
console.log("Бюджет на день: ", budgetDay);

//Вывод информации для пользователя
if (budgetDay >= 1200) {
    console.log("У вас высокий уровень дохода");
} else if ((budgetDay >= 600)&&(budgetDay < 1200)) {
    console.log("У вас средний уровень дохода");
} else if ((budgetDay > 0) && (budgetDay < 600)) {
    console.log("К сожалению, у вас уровень дохода ниже среднего");
} else {
    console.log("Что-то пошло не так"); 
}
