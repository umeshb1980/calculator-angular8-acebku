import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const calculator = {
      displayValue: '0',
      firstOperand: null,
      waitingForSecondOperand: false,
      operator: null,
    };

    function updateDisplay() {
      const display: any = document.querySelector('.screen-calc');
      display.value = calculator.displayValue;
    }

    function resetCalculator() {
      calculator.displayValue = '0';
      calculator.firstOperand = null;
      calculator.waitingForSecondOperand = false;
      calculator.operator = null;
    }

    updateDisplay();

    const keys: any = document.querySelector('.btn-calc');
    keys.addEventListener('click', (event) => {
      const target = event.target;
      if (!target.matches('button')) {
        return;
      }

      if (target.classList.contains('operator')) {
        handleOperator(target.value);
        updateDisplay();
        return;
      }

      if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        updateDisplay();
        return;
      }

      if (target.classList.contains('clear')) {
        resetCalculator();
        updateDisplay();
      }

      inputDigit(target.value);
      updateDisplay();
      return;
    });

    function inputDigit(digit) {
      const { displayValue, waitingForSecondOperand } = calculator;

      if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
      } else {
        calculator.displayValue =
          displayValue === '0' ? digit : displayValue + digit;
      }
    }

    function inputDecimal(dot) {
      if (calculator.waitingForSecondOperand === true) {
        return;
      }
      if (!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
      }
    }
    const performCalculation = {
      '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
      '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
      '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
      '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
      '=': (firstOperand, secondOperand) => secondOperand,
    };

    function handleOperator(nextOperator) {
      const { firstOperand, displayValue, operator } = calculator;
      const inputValue = parseFloat(displayValue);

      if (operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
      }

      if (firstOperand == null) {
        calculator.firstOperand = inputValue;
      } else if (operator) {
        const currentValue = firstOperand || 0;
        const result = performCalculation[operator](currentValue, inputValue);
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
      }
      calculator.waitingForSecondOperand = true;
      calculator.operator = nextOperator;
    }
  }
}
