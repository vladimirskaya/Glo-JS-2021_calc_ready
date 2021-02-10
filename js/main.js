'use strict'


let money,
	//Функция, проверяет является ли введенное значение числом
	isNumber = function(n) {
		/*1. вычленяется флоат: возвращает или число, или NaN (если строка ) 
		  2. проверка пол.рез-та на то, является ли он NaN: 
							- если число, то возвращает false 
							- если NaN, то возвращает true (т.е. если введена строка)
		  3. происходит инверсия результата от п.2: если было введено число, то true. Если стркоа, то false.
		  4. isFinite() - конечное ли число: возвращает true, если да, или false, если бесконечное
		  5. && - возвращает первое ложное значение. Если все истинны, то возвращает последнее true.
		  Т.е. если было введено число, то возврат true */
		return !isNaN(parseFloat(n)) && isFinite(n);
    },
	//Функция, проверяет является ли число больше нуля
	isNumberValid = function(x){
		/*1. если значение - число, то
		  2. возвращает true, если число больше 0. И false - если равно 0 или меньше */
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
				/* возвращает к инверсии, следовательно, строка преобразуется в булево значение:
							если таки пустая, то false, если непустая и нормальная, то true*/
			}
		} else {
			//console.log("Пустая строка");
			return false;
		}
	},

	start = function(){
		do {
			money = prompt("Ваш месячный доход?");
		} while (!isNumberValid(money)); 
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