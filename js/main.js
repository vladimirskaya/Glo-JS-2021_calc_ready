'use strict';

let salaryAmount = document.querySelector('.salary-amount'), // месячный доход
	incomeItems = document.querySelectorAll('.income-items'), // дополнительные доходЫ
	btnIncomesPlus = document.getElementsByTagName('button')[0], // кнопка - добавить поле для ввода по допдоходам
	addIncomesItems = document.querySelectorAll('.additional_income-item'), // возможные доходЫ
	expensesItems = document.querySelectorAll('.expenses-items'), // обязательные расходы
	btnExpensesPlus = document.getElementsByTagName('button')[1], // кнопка - добавить поле для ввода по допдоходам
	//additionalExpenses = document.querySelector('.additional_expenses'),	// это div "Возможные расходы"
	additionalExpensesItem = document.querySelector('.additional_expenses-item'), // это input "Возможные расходы"
	depositCheck = document.querySelector('#deposit-check'), // флажок, что есть депозит
	targetAmount = document.querySelector('.target-amount'), // цель: сколько нужно накопить 
	periodSelect = document.querySelector('.period-select'), // range период расчета	
	periodAmount = document.querySelector('.period-amount'), // цифра по range
	dataInputForms = document.querySelectorAll('.data input[type=text]'),
	depositBank = document.querySelector('.deposit-bank'),
	depositAmount = document.querySelector('.deposit-amount'),
	depositPercent = document.querySelector('.deposit-percent'),


	btnStart = document.getElementById('start'),
	btnCancel = document.getElementById('cancel'),

	//блок выводных данных
	budgetMonthOutput = document.getElementsByClassName('result-total budget_month-value')[0], //вывод дохода за месяц
	budgetDayOutput = document.getElementsByClassName('result-total budget_day-value')[0], //вывод дохода за день
	expensesMonthOutput = document.getElementsByClassName('result-total expenses_month-value')[0], //вывод расходов за месяц
	addIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0], //вывод ВОЗМ.доходов за месяц
	addExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0], //вывод ВОЗМ.расходов за месяц
	incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0], //вывод накполений за период
	targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0], //вывод количества месяцев для достижения цели

	incomeTitle = document.querySelector('.income-title'), // добавлены из видео Практика 11 урока: div с заголовком "Дополнительный доход"
	expensesTitle = document.querySelector('.expenses-title'), // добавлены из видео Практика 11 урока: div с заголовком "Обязательные расходы"
	expenses = document.querySelector('.expenses'),
	bindGetPercentValue;
	depositCheck.checked = false;

class AppData { // задаем класс 
	constructor() {
		this.budget = 0
		this.budgetDay = 0
		this.budgetMonth = 0
		this.expensesMonth = 0
		this.income = {}
		this.incomeMonth = 0
		this.addIncome = []
		this.expenses = {}
		this.addExpenses = []
		this.deposit = false
		this.depositPercent = 0
		this.moneyDeposit = 0
		this.period = 0
	}


	//Функция, проверяет является ли введенное значение числом
	isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	//Функция, проверяет является ли число больше нуля
	isNumberValid(x) {
		if (this.isNumber(x)) {
			return (parseFloat(x) > 0);
		}
	}

	//Функция, проверяет является ли строка валидной
	isValidString(s) {
		if (s) {
			if (this.isNumber(s)) {
				return false;
			} else {
				s = s.trim();
				return s;
			}
		} else {
			return false;
		}
	}

	start() {
		if (this.isNumberValid(salaryAmount.value)) {
			//console.log('start()  : ',this);
			this.budget = salaryAmount.value; // присвоить свойству appData.budget введеное значение из формы
			this.getExInc(); // 					appData.incomeMonth
			this.getAddIncome(); //					appData.expenses
			this.getAddExpenses();
			this.getInfoDeposit(); //					appData.addExpenses
			this.getBudget(); //					appData.budgetMonth, appData.budgetDay
			this.showResult();

			dataInputForms = document.querySelectorAll('.data input[type=text]');
			dataInputForms.forEach((item) => {
				item.disabled = true;
			});
			btnStart.style.display = 'none';
			btnCancel.style.display = 'initial';
			btnExpensesPlus.disabled = true;
			btnIncomesPlus.disabled = true;

		} else {
			btnStart.disabled = false;
			alert("Введите месячный доход.");
			salaryAmount.value = '';
			return;
		}
	}

	reset() {
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;

		//Сброс введных данных по форме
		const allInputForms = document.querySelectorAll('input[type=text]'), // все интупы кроме кнопок
			dataInputForms = document.querySelectorAll('.data input[type=text]'), // все инпуты с входными данными
			expensesItems = document.querySelectorAll('.expenses-items');

		allInputForms.forEach((item) => {
			item.value = '';
		});
		dataInputForms.forEach((item) => {
			item.disabled = false;
		});
		btnStart.disabled = false;
		btnStart.style.display = 'initial';
		btnCancel.style.display = 'none';
		let divIncome = document.querySelector('.income');
		let divExpenses = document.querySelector('.expenses');

		for (let i = divIncome.childElementCount - 1; i > 1; i--) {
			if (divIncome.children[i].tagName === 'DIV' && divIncome.children[i].localName === 'div') {
				divIncome.children[i].remove();
			}
			//console.log(incomeItems.length);

		}
		for (let i = divExpenses.childElementCount - 1; i > 1; i--) {
			if (divExpenses.children[i].tagName === 'DIV' && divExpenses.children[i].localName === 'div') {
				console.log(divExpenses.children[i]);

				divExpenses.children[i].remove();
			}
			//console.log(incomeItems.length);


		}

		depositCheck.checked = false;
		this.depositHandler();	
		
		btnExpensesPlus.disabled = false;
		btnIncomesPlus.disabled = false;
		btnIncomesPlus.style.display = 'initial';
		btnExpensesPlus.style.display = 'initial';
		periodSelect.value = 1;
		periodAmount.innerHTML = 1;
	}

	showResult() {
		budgetMonthOutput.value = this.budgetMonth; // доход за месяц
		budgetDayOutput.value = this.budgetDay; // дневной бюджет
		expensesMonthOutput.value = this.expensesMonth; // расход за месяц			
		addIncomeValue.value = this.addIncome.join(', '); // возможные доходы
		addExpensesValue.value = this.addExpenses.join(', '); // возможные расходы
		targetMonthValue.value = this.getTargetMonth(); // накопления за период

		const findIncPerValue = () => {
			incomePeriodValue.value = this.calcPeriod(); // срок достижения цели в месяцах
		};
		findIncPerValue(); // расчет поля incomePeriodValue.value на 1 раз
		periodSelect.removeEventListener('input', findIncPerValue, false); // удаление предыдущего обработчика события
		periodSelect.addEventListener('input', findIncPerValue); // расчет поля incomePeriodValue.value на последующие разы (добавляется обрабочик)
	}

	//ф.  получение данных по ДОПОЛНИТЕЛЬНЫМ доходам  и ОБЯЗАТЕЛЬНЫМ расходам  и занесение их в объект
	getExInc() {
		const count = (item) => {
			const startStr = item.className.split('-')[0];
			//console.log(item, '    ',item.className, startStr);
			const itemTitle = item.querySelector(`.${startStr}-title`).value;
			const itemAmount = item.querySelector(`.${startStr}-amount`).value;
			if (itemTitle !== '' && itemAmount !== '') {
				this[startStr][itemTitle] = +itemAmount;
			}
		};

		incomeItems.forEach(count);
		expensesItems.forEach(count);
		//console.log(this.income, this.expenses);
		//переделать потом			
		for (let key in this.income) {
			this.incomeMonth += this.income[key]
		}

		for (let key in this.expenses) {
			this.expensesMonth += this.expenses[key];
		}
	}

	//ф.: добавляет дополнительный блок для ввода ДОПОЛНИТЕЛЬНЫХ расходов
	addIncomeBlock() {

		incomeItems = document.querySelectorAll('.income-items');
		btnIncomesPlus = document.getElementsByTagName('button')[0];

		const cloneIncomeItem = incomeItems[0].cloneNode(true),
			children = [];
		for (let child of cloneIncomeItem.children) {
			child.value = '';
		}
		incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnIncomesPlus);
		incomeItems = document.querySelectorAll('.income-items');
		if (incomeItems.length === 3) {
			btnIncomesPlus.style.display = 'none';
		}
	}

	//ф. добавляется дополнительный блок для ввода ОБЯЗАТЕЛЬНЫХ расходов
	addExpensesBlock() {

		expensesItems = document.querySelectorAll('.expenses-items');
		btnExpensesPlus = document.getElementsByTagName('button')[1];

		let cloneExpensesItem = expensesItems[0].cloneNode(true),
			children = [];
		for (let child of cloneExpensesItem.children) {
			child.value = '';
		}
		//console.log("expensesItems[0] is connnected ^" , expensesItems[0].isConnected);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnExpensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			btnExpensesPlus.style.display = 'none';
		}
	}

	//ф.  получение данных по ВОЗМОЖНЫМ доходам и занесение их в объект
	getAddIncome() {
		addIncomesItems.forEach((item) => {
			let itemValue = item.value.trim();
			if (itemValue !== ''){
				this.addIncome.push(itemValue);
			}
		});	
	}

	//ф.  получение данных по ВОЗМОЖНЫМ расходам и занесение их в объект
	getAddExpenses() {
		let addExpenses = additionalExpensesItem.value.split(',');
		//console.log(addExpenses);
		addExpenses.forEach((item) => {
			if (item !== '') {
				item = item.trim();
				this.addExpenses.push(item);
			}
		});
	}

	//ф. высчитывает свойства: бюджет на месяц и на день

	getBudget() {
		const monthDeposit = this.moneyDeposit * this.percentDeposit / 100;
		appData.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth + monthDeposit;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	}

	//ф. возвращает количество месяцев, нужное для достигнужения цели
	getTargetMonth() {
		return Math.ceil(targetAmount.value / this.budgetMonth);
	}

	//ф. вывод информации для пользователя
	getStatusIncome() {
		//console.log('getStatusIncome  : this = ', this);
		if (this.budgetDay >= 1200) {
			return ("У вас высокий уровень дохода");
		} else if ((this.budgetDay >= 600) && (this.budgetDay < 1200)) {
			return ("У вас средний уровень дохода");
		} else if ((this.budgetDay > 0) && (this.budgetDay < 600)) {
			return ("К сожалению, у вас уровень дохода ниже среднего");
		} else {
			return ("Что-то пошло не так");
		}
	}

	//ф. расчет накоплений за период
	calcPeriod() {
		//console.log('calcPeriod  : this = ', this);
		return this.budgetMonth * periodSelect.value;
	}

	//ф. обработки перемещения бегунка
	changeRange() {
		periodAmount.innerHTML = periodSelect.value;
	}

	//ф. получение данных по депозитам
	getInfoDeposit() {
		if (this.deposit) {
			this.percentDeposit = +depositPercent.value;
			this.moneyDeposit = +depositAmount.value;
			this.changePercent();
		}
	}

getPercentValue(){
	console.log('getPercentValue   success');
	//this.depositPercent = depositPercent.value;
	// if (this.isNumberValid(+depositPercent.value)) {
	// 	this.percentDeposit = +depositPercent.value;
	// 	console.log('finf');
	// }else{
	// 	alert('sdfsdjhfjsfhkjhf');
	// 	btnStart.disabled = true;
	// }
	console.log();
}


	changePercent() {
		
		
		let valueSelect = this.value;
		console.log('pfyxftybt ',valueSelect);
		if (valueSelect === 'other') {
			depositPercent.style.display = 'inline-block';
			depositPercent = document.querySelector('.deposit-percent');
			valueSelect = +depositPercent.value;
			console.log('valueSelect = ', valueSelect);
			//depositBank.addEventListener('change', bindGetPercentValue);
			if (valueSelect > 0 && valueSelect < 100) {
				this.percentDeposit = valueSelect;
			//console.log('this.percentDeposit = ', this.percentDeposit);
			}else {
			// // 		btnStart.disabled = true;
				alert('Вdедите корректное значение от 0 до 100.');
			 	}

				console.log('выход из внешнего');
		} else {
			
			depositPercent.value = valueSelect;
			depositPercent.style.display = 'none';

	}
}


	depositHandler() {
		
		if (depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';

			this.deposit = true;
			depositBank.addEventListener('change', this.changePercent);
			//bindGetPercentValue = this.getPercentValue.bind(this);
		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositPercent.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			this.deposit = false;
			depositPercent.value = '';
			depositBank.removeEventListener('change', this.changePercent);
		}
	}





	eventListeners() {
		//console.log('this in eventListener^ ',this);
		btnStart.addEventListener('click', this.start.bind(this));
		btnCancel.addEventListener('click', this.reset.bind(this));
		btnExpensesPlus.addEventListener('click', this.addExpensesBlock);
		btnIncomesPlus.addEventListener('click', this.addIncomeBlock);
		periodSelect.addEventListener('input', this.changeRange);

		if (this.getTargetMonth() > 0) {
			console.log("Цель будет достигнута за ", this.getTargetMonth(), "месяцев(-а)");
		} else {
			console.log(this.getStatusIncome());
		}

		depositCheck.addEventListener('change', this.depositHandler.bind(this));
		// depositPercent.addEventListener('change',this)
	}
};

const appData = new AppData();

appData.eventListeners();
console.log(appData);