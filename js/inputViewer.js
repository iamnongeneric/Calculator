"use strict";

var InputViewer = (function () {

  function InputViewer(args) {

    this.viewElement = args.viewElement;

    this.fullInput = this.viewElement.querySelector
                                ('[data-selector="full_input"]');
    this.currentElementInput = this.viewElement.querySelector
                                ('[data-selector="current_input"]');

    this.fullInput.addEventListener('change', this.appendDataToInput.bind(this));
    this.currentElementInput.addEventListener('change', this.appendDataToInput.bind(this));
  }

  InputViewer.prototype.setCurrentValue = function(value) {
    this.currentElementInput.value = value;
  }

  InputViewer.prototype.getCurrentValue = function() {
    return this.currentElementInput.value;
  }

  InputViewer.prototype.setFullValue = function(value) {
    this.fullInput.value = value;
  }

  InputViewer.prototype.getFullValue = function() {
    return this.fullInput.value;
  }

  InputViewer.prototype.updateCurrentValue = function (value) {
    this.currentElementInput.value += value;
  }

  InputViewer.prototype.updateFullValue = function (value) {
    this.fullInput.value += value;
  }

  InputViewer.prototype.appendDataToInput = function (data) {

    if (data === "Clear") {
      this.setFullValue("");
      this.setCurrentValue(0);
    }

    else if (data === "Backspace") {

      if (this.getCurrentValue() <= 1) {
        this.setCurrentValue(0);
      }
      else {
        var newValue = this.getCurrentValue().slice(0, -1);
        this.setCurrentValue(newValue);
      }

    }

    else if (data === "+/-") {
      var newValue = -1 * this.getCurrentValue();
      this.setCurrentValue(newValue);
    }

    else if (data === "=") {
      var fullValue = this.getFullValue();
      var length = fullValue.length;

      if (isNaN(parseInt(fullValue[length - 1]))) {
        var validInputValue = fullValue.slice(0,-1);
        fullValue = validInputValue;
      }

      var showRes = new Function("return " + fullValue);
      this.setCurrentValue(showRes());
      this.setFullValue("");
    }


    else if (isNaN(parseInt(data))){

      if (this.getCurrentValue() === 0) {
        return;
      }

      var fullValue = this.getFullValue();
      var length = fullValue.length;

      if (isNaN(parseInt(fullValue[length - 1])) && length !== 0
          && this.getCurrentValue() === 0) {
        var updatedValue = fullValue.slice(0, -1) + data;
        this.setFullValue(updatedValue);
      }
      else {
        this.updateFullValue(this.getCurrentValue() + data);
      }

      this.setCurrentValue(0);
    }

    else {
      if (parseInt(this.getCurrentValue()) === 0) {
        if (parseInt(data) === 0) {
          return;
        }

        this.setCurrentValue(data);
        return;
      }

      this.updateCurrentValue(data);

    }
  }

  return InputViewer;
})();
