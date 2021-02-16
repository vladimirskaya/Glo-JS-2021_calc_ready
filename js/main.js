'use strict'

let btnStart = document.getElementById('start'),
    btnIncomesPlus = document.getElementsByTagName('button')[0],
    btnExpensesPlus = document.getElementsByTagName('button')[1],
    flagDeposit  = document.querySelector('#deposit-check'),
    additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
    //extraIncome2 = document.querySelectorAll('.additional_income-item')[1],
    budgetDayOutput = document.getElementsByClassName('result-total budget_day-value')[0],
    budgetMonthOutput = document.getElementsByClassName('result-total budget_month-value')[0],
	expensesMonthOutput = document.getElementsByClassName('result-total expenses_month-value')[0],
    addIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0],
    incomePeriodOutput = document.getElementsByClassName('result-income_period'),
    targetMonthOutput = document.getElementsByClassName('result-target_month'),
    salaryInput = document.querySelector('.salary-amount'),  // salaryAmount
	incomeTitle = document.querySelector('.income-title'), // добавлены из видео Практика 11 урока
	incomeAmount = document.querySelector('.income-amount'), // добавлены из видео Практика 11 урока
	expensesTitle = document.querySelector('.expenses-title'), // добавлены из видео Практика 11 урока
	expensesItems = document.querySelectorAll('.expenses-items'), // delete
	additionalExpenses = document.querySelector('.additional_expenses'), // добавлены из видео Практика 11 урока
    periodRangeSelect = document.querySelector('.period-select'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'); // periodSelect

 //Функция, проверяет является ли введенное значение числом
let	isNumber = function(n) {
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
		addIncome: [],
		expenses: {},
		addExpenses: [],
		deposit: false,
		procentDeposit: 0,
		moneyDeposit: 0,
		period: 3,
		start: function(){
			if (salaryInput.value === '') {
				alert('Error!');
				return;
			}
			appData.budget = salaryInput.value;
			//console.log('salaryInput = ', salaryInput.value );
			appData.getExpenses();

			appData.getExpensesMonth();
			appData.getBudget();
			appData.getAddExpenses();
			appData.getAddIncome();
			appData.showResult();
		},

		showResult: function(){
			budgetDayOutput.value = appData.budgetDay;
			budgetMonthOutput.value = appData.budgetMonth;
			expensesMonthOutput.value = appData.expensesMonth;
			addExpensesValue.value = appData.addExpenses.join(', ');
			addIncomeValue.value = appData.addIncome.join(', ');
			console.log(addIncomeValue.value );
		},

		//methdd: add extra input by pushing button 'plus' -- lesson11
		addExpensesBlock: function(){
				
				let cloneExpensesItem = expensesItems[0].cloneNode(true);
				expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
				expensesItems = document.querySelectorAll('.expenses-items');
				if (expensesItems.length === 3) {
					btnExpensesPlus.style.display = 'none';
				}
		},

		getExpenses: function(){
			expensesItems.forEach(function(item){
				let itemExpenses = item.querySelector('.expenses-title').value;
				let cashExpenses = item.querySelector('.expenses-amount').value;
				if (itemExpenses !== '' && cashExpenses !== '') {
					appData.expenses[itemExpenses] = cashExpenses;
				}
			});
		},

		getAddExpenses: function(){
			let addExpenses = additionalExpensesItem.value.split();
			addExpenses.forEach(function(item) {
				if (item !== '') {
					item = item.trim();
					appData.addExpenses.push(item);
				}
			});
		},

		getAddIncome: function(){
			additionalIncomeItems.forEach(function(item){
				let itemValue = item.value.trim();
				if (itemValue !== ''){
					appData.addIncome.push(itemValue);
				}
			});
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

			
		},
		budget: 0,
		budgetDay: 0,
		budgetMonth: 0,
		expensesMonth: 0,
		getExpensesMonth: function(){			 	//высчитает свойство: сумма обяз.расходов за месяц
			for (let key in appData.expenses) {
				appData.expensesMonth += +appData.expenses[key];
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

btnExpensesPlus.addEventListener('click', appData.addExpensesBlock);


/*if (appData.getTargetMonth() > 0) {
	console.log("Цель будет достигнута за ", appData.getTargetMonth(), "месяцев(-а)");
} else {
	console.log(appData.getStatusIncome());
}*/