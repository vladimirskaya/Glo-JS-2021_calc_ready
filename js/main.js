'use strict'

//Функция, проверяет является ли введенное значение числом
let money,

	isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
    },
    
	start = function(){
		do {
			money = prompt("Ваш месячный доход?");
		} while (!isNumber(money)); 
	};
	
start(); 

let appData = {
		income: {},
		addIncome: {},
		expenses: {},
		addExpenses: [],
		deposit: false,
		mission: 100000,
		period: 3,
		asking: function(){
			let	exp, a, 
				addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую.");
			appData.addExpenses = addExpenses.toLowerCase().split(','); 
			appData.deposit = confirm('Есть ли у вас депозит в банке?');
			for (let i = 0; i < 2; i++) {
				exp = prompt("Введите обязательную статью расходов?");
				do {
					a = prompt("Во сколько это обойдется?");
				} while (!isNumber(a));
				appData.expenses[exp] = parseFloat(a);
				//console.log("asking  : ", appData.expenses[exp]);
			};
		},
		budget: money,
		budgetDay: 0,
		budgetMonth: 0,
		expensesMonth: 0,
		getExpensesMonth: function(){			 	//высчитает свойство: сумма обяз.расходов за месяц
			for (let key in appData.expenses) {
				appData.expensesMonth += appData.expenses[key];
				}
		},
		getBudget: function(){ 						//высчитывает свойства: бюджет на месяц и на день
			appData.budgetMonth = appData.budget - appData.expensesMonth;
			appData.budgetDay = Math.floor(appData.budgetMonth / 30);
		},
		getTargetMonth: function() {				//возвращает количество месяцев, нужное для достигнужения цели
			return Math.ceil(appData.mission / appData.budgetMonth);
		},
		getStatusIncome: function(){				//вывод информации для пользователя
			if (appData.budgetDay >= 1200) {
				return("У вас высокий уровень дохода");
			} else if ((appData.budgetDay >= 600) && (appData.budgetDay < 1200)) {
				return("У вас средний уровень дохода");
			} else if ((appData.budgetDay > 0) && (appData.budgetDay < 600)) {
				return("К сожалению, у вас уровень дохода ниже среднего");
			} else {
				return("Что-то пошло не так"); 
			}  
			
		}	
}
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
console.log("Расходы за месяц: ", appData.expenses);  
console.log("Цель будет достигнута за ", appData.getTargetMonth(), "месяцев(-а)");
console.log(appData.getStatusIncome());

console.log("Наша программа включает в себя данные: ")
for (let key in appData) {
	console.log(key, ' : ', appData[key]);
}