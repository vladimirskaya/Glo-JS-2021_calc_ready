let money, income, addExpenses, deposit; /* переменные по доходам и расходам */
let mission, period; /* переменные: цель и за какой период */

money = 15000; 
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