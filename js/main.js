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
			this.addExpenses = addExpenses.toLowerCase().split(','); 
			this.deposit = confirm('Есть ли у вас депозит в банке?');
			for (let i = 0; i < 2; i++) {
				exp = prompt("Введите обязательную статью расходов?");
				do {
					a = prompt("Во сколько это обойдется?");
				} while (!isNumber(a));
				this.expenses[exp] = parseFloat(a);
			};
		},
		budget: money,
		budgetDay: 0,
		budgetMonth: 0,
		expensesMonth: 0,
		getExpensesMonth: function(){			 	//высчитает свойство: сумма обяз.расходов за месяц
			let sum = 0;
			for (let key in this.expenses) {
				sum += this.expenses[key];
				}
			appData.expensesMonth = sum;
		},
		getBudget: function(){ 						//высчитывает свойства: бюджет на месяц и на день
			this.budgetMonth = this.budget - this.expensesMonth;
			this.budgetDay = Math.floor(this.budgetMonth / 30);
		},
		getTargetMonth: function() {				//подсчитывает за какой период будет достигнута цель
			this.period = Math.ceil(this.mission / this.budgetMonth);
		},
		getStatusIncome: function(){				//вывод информации для пользователя
			if (this.budgetDay >= 1200) {
				return("У вас высокий уровень дохода");
			} else if ((this.budgetDay >= 600) && (this.budgetDay < 1200)) {
				return("У вас средний уровень дохода");
			} else if ((this.budgetDay > 0) && (this.budgetDay < 600)) {
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
console.log("Цель будет достигнута за ", appData.period, "месяцев(-а)");
console.log(appData.getStatusIncome());

console.log("Наша программа включает в себя данные: ")
for (let key in appData) {
	console.log(key, ' : ', appData[key]);
}