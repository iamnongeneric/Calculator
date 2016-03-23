"use strict";

var Calculator = (function () {

  function Calculator(args) {
    this.viewElement = args.viewElement;

    console.log(this.viewElement);
    this.buttonsSection = this.viewElement.querySelector('[data-selector="buttons"]');

    this.inputViewer = new InputViewer({
      viewElement : this.viewElement.querySelector('[view-component="input_viewer"]')
    });

    this.buttonsSection.addEventListener('click', this.onButtonClick.bind(this));
  }

  Calculator.prototype.onButtonClick = function (event) {
    var button = event.target.closest('[data-selector="button"]');

    if (!button) {
      return;
    }

    var buttonName = button.innerHTML;

    this.inputViewer.appendDataToInput(buttonName);
  }

  return Calculator;
})();
