'use strict'

let money, income, addExpenses, deposit; /* переменные по доходам и расходам */
let mission, period; /* переменные: цель и за какой период */
let budgetMonth, budgetDay; /* переменные бюджета по перидам */
let exp1, exp2, cost1, cost2;  /* дополнитеьные статьи расходов */ 

money = 45000;  // Доход за месяц
income = "фриланс";
addExpenses = "Интернет, Такси, Коммуналка, кОфе, Вкукусняхи и прочая ересь";
deposit = true;
mission = 1000000;
period = 12;

console.log(`Тип переменной money: ${typeof money}`);
console.log(`Тип переменной income: ${typeof income}`);
console.log(`Тип переменной deposit: ${typeof deposit}`);
console.log(`Длина строки addExpenses: ${addExpenses.length}`);
console.log(`Период равен: ${period} месяцев`);
console.log(`Цель: заработать ${mission} рублей`);
console.log("addExpenses", addExpenses.toLowerCase().split(','));

//Получение данных от пользователя
money = +prompt("Ваш месячный доход?");
addExpenses = (prompt("Перечислите возможные расходы за рассчитываемый период через запятую")).split(',');
console.log(addExpenses);

// Присвоение булевого значения в соответствии с ответом от пользователя
deposit = prompt('Есть ли у вас депозит в банке?');
if (!((deposit.toLowerCase() == 'да')||(deposit.toLowerCase() == 'yes'))) {
    deposit = false;  
    console.log(deposit);                         
    }

// Дополнительные статьи расходов
for (let i=0; i<2; i++) {
    let x = prompt("Введите обязательную статью расходов?");
    (i==0) ? exp1=x : exp2 = x;
    x = prompt("Во сколько это обойдется?");
    (i==0) ? cost1=x : cost2 = x;
    }

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
