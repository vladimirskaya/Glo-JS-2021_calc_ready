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
		procentDeposit: 0,
		moneyDeposit: 0,
		mission: 100000,
		period: 3,
		asking: function(){
			let	exp, a,
				addExpenses, itemIncome, cashIncome ;

			if (confirm("Есть ли у вас дополнительный заработок?")) {
				do {
					itemIncome = prompt("Какой у вас допольнительный заработок?", "Таксую");
					//console.log(!isNumber(itemIncome),  itemIncome !== '', itemIncome !== null);
				} while (!(!isNumber(itemIncome) && itemIncome !== '' && itemIncome !== null));
				do {
					cashIncome = prompt("Сколько в месяц вы на этом зарабатываете?");
					//console.log(cashIncome);
				} while (!isNumber(cashIncome));
				appData.income[itemIncome] = cashIncome;
			}

			addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую.");
			appData.addExpenses = addExpenses.toLowerCase().split(','); 


			appData.deposit = confirm('Есть ли у вас депозит в банке?');

			for (let i = 0; i < 2; i++) {
				do {
					exp = prompt("Введите обязательную статью расходов?");
					//console.log(!isNumber(exp), exp !== '', exp !== null);
				} while (!(!isNumber(exp) && exp !== '' && exp !== null));
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
			
		},
		getInfoDeposit: function(){
			if (appData.deposit){
				do {
					appData.procentDeposit = ("Какой годовой процент", 10);
					//console.log("!isNumber(appData.procentDeposit - ", !isNumber(appData.procentDeposit));
				} while (!isNumber(appData.procentDeposit));
				do {
					appData.moneyDeposit = prompt("Какая сумма заложена?", 10000);
					//console.log("!isNumber(appData.moneyDeposit - ", !isNumber(appData.moneyDeposit));
				} while (!isNumber(appData.moneyDeposit));	
			}
		},
		calcSaveMoney: function(){
			return appData.budgetMonth * appData.period
		}
}
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log("Расходы за месяц: ", appData.expenses);  
console.log("Цель будет достигнута за ", appData.getTargetMonth(), "месяцев(-а)");
console.log(appData.getStatusIncome());

/*console.log("Наша программа включает в себя данные: ");
for (let key in appData) {
	console.log(key, ' : ', appData[key]);
}*/

appData.getInfoDeposit();
console.log(appData.procentDeposit, appData.moneyDeposit, appData.calcSaveMoney);

// функция вывода данных массива в потребном виде
let addExpensesOut = function(arr){
	let i =0,
		addExpArr =[]; // пустой массив, в который записываются данные в корректном виде
	do {
		arr[i] = arr[i].trim(); // удаляем лишние пробелы
		if (arr[i] === '') {  // проверка на пустое значение, если ""
			arr[i] = '-';
		}
		arr[i] = arr[i][0].toUpperCase() + arr[i].slice(1); // преобразование элемента
		addExpArr[i] = arr[i];	 // запись элемента в новый массив
		i++;
		} while (i < arr.length); 
	return addExpArr.join(', ');
}

console.log(`Возможные расходы (addExpenses):\n${addExpensesOut(appData.addExpenses)}`);