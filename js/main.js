'use strict'

let money = +prompt("Ваш месячный доход?");
let income = "фриланс";
let addExpenses = (prompt("Перечислите возможные расходы за рассчитываемый период через запятую")).split(',');
let deposit = confirm('Есть ли у вас депозит в банке?');    
let mission = 1000000;
let period = 12;
let budgetMonth, budgetDay; /* переменные бюджета по перидам */
// Дополнительные статьи расходов
let exp1 = prompt("Введите обязательную статью расходов?");
let cost1 = prompt("Во сколько это обойдется?");
let exp2 = prompt("Введите обязательную статью расходов?");
let cost2 = prompt("Во сколько это обойдется?");

/*console.log(`Тип переменной money: ${typeof money}`);
console.log(`Тип переменной income: ${typeof income}`);
console.log(`Тип переменной deposit: ${typeof deposit}`);
console.log(`Длина строки addExpenses: ${addExpenses.length}`);
console.log(`Период равен: ${period} месяцев`);
console.log(`Цель: заработать ${mission} рублей`);
console.log("addExpenses", addExpenses.toLowerCase().split(','));*/

// Расчет бюджета по периодам, дополнительно нахождение количества месяцев для достижения заданной цели
budgetMonth = money - cost1 - cost2;
console.log("Бюджет на конец месяца:", budgetMonth );
period = Math.ceil(mission / budgetMonth);
console.log(`Цель будет достигнута за ${period} месяцев(-а)`);
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
