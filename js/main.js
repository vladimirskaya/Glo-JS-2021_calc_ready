'use strict'

let btnStart = document.getElementById('start'),
    btnIncomesPlus = document.getElementsByTagName('button')[0],
    btnExpensesPlus = document.getElementsByTagName('button')[1],
    flagDeposit  = document.querySelector('#deposit-check'),
    extraIncome1 = document.querySelectorAll('.additional_income-item')[0],
    extraIncome2 = document.querySelectorAll('.additional_income-item')[1],
    budgetDayOutput = document.getElementsByClassName('result-budget_day'),
    expensesMonthOutput = document.getElementsByClassName('result-expenses_month'),
    addIncomeOutput = document.getElementsByClassName('result-additional_income'),
    addExpensesOutput = document.getElementsByClassName('result-additional_expenses'),
    incomePeriodOutput = document.getElementsByClassName('result-income_period'),
    targetMonthOutput = document.getElementsByClassName('result-target_month'),
    salaryInput = document.querySelector('.salary-amount'),  // salaryAmount
	incomeTitle = document.querySelector('.income-title'), // добавлены из видео Практика 11 урока
	incomeAmount = document.querySelector('.income-amount'), // добавлены из видео Практика 11 урока
	expensesTitle = document.querySelector('.expenses-title'), // добавлены из видео Практика 11 урока
	expensesAmount = document.querySelector('.expenses-amount'), // добавлены из видео Практика 11 урока
	additionalExpenses = document.querySelector('.additional_expenses'), // добавлены из видео Практика 11 урока
    peroidRangeSelect = document.querySelector('.period-select'); // periodSelect

let money,
	//Функция, проверяет является ли введенное значение числом
	isNumber = function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
    },
	//Функция, проверяет является ли число больше нуля
	isNumberValid = function(x){
		  if (isNumber(x)) {
			return (parseFloat(x) > 0);
		  }
	},
	
	isValidString = function(s){
		//console.log("проверка валидности строкового значения.", s);
		if (s){
			//console.log("это не пустая строка");
			if (isNumber(s)) {
				//console.log("но это число");
				return false;
			} else {
				console.log("а вот это нормальная строка",s);
				s = s.trim();
				return s ; 
			}
		} else {
			//console.log("Пустая строка");
			return false;
		}
	},

	appData = {
		income: {},
		addIncome: {},
		expenses: {},
		addExpenses: [],
		deposit: false,
		procentDeposit: 0,
		moneyDeposit: 0,
		mission: 100000,
		period: 3,
		start: function(){
			do {
				money = prompt("Ваш месячный доход?");
			} while (!isNumberValid(money)); 
			
			/*appData.asking();
			appData.getExpensesMonth();
			appData.getBudget();*/
		},
		asking: function(){
			let	exp, a,
				addExpenses, itemIncome, cashIncome ;

			if (confirm("Есть ли у вас дополнительный заработок?")) {
				do {
					itemIncome = prompt("Какой у вас допольнительный заработок?", "Таксую");
				} while (!isValidString(itemIncome));
				do {
					cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?");
					//console.log(cashIncome);
				} while (!isNumberValid(cashIncome));
				appData.income[itemIncome] = cashIncome;
			}

			addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую.");
			appData.addExpenses = addExpenses.toLowerCase().split(','); 


			appData.deposit = confirm('Есть ли у вас депозит в банке?');

			for (let i = 0; i < 2; i++) {
				do {
					exp = prompt("Введите обязательную статью расходов?");
					//console.log(!isNumber(exp), exp !== '', exp !== null);
				} while (!isValidString(exp));
				do {
					a = prompt("Во сколько это обойдется?");
				} while (!isNumberValid(a));
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
			
		},
		getInfoDeposit: function(){
			if (appData.deposit){
				do {
					appData.procentDeposit = parseFloat(prompt("Какой годовой процент", 10));
					//console.log("!isNumberValid(appData.procentDeposit - ", !isNumberValid(appData.procentDeposit));
				} while (!isNumberValid(appData.procentDeposit));
				do {
					appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
					//console.log("!isNumberValid(appData.moneyDeposit - ", !isNumberValid(appData.moneyDeposit));
				} while (!isNumberValid(appData.moneyDeposit));	
			}
		},
		calcSaveMoney: function(){
			return appData.budgetMonth * appData.period
		}
}

btnStart.addEventListener('click', appData.start); 



if (appData.getTargetMonth() > 0) {
	console.log("Цель будет достигнута за ", appData.getTargetMonth(), "месяцев(-а)");
} else {
	console.log(appData.getStatusIncome());
}