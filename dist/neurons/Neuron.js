"use strict";
/**
 * File containing classes and interfaces for the base linear Neuron
 *
 * @author Timur Kuzhagaliyev <tim@xaerus.co.uk>
 * @copyright 2016
 * @license https://opensource.org/licenses/mit-license.php MIT License
 * @version 0.0.9
 */
/**
 * Class representing the base neuron, used in hidden layers
 * @since 0.0.1
 */
var Neuron = (function () {
    /**
     * Neuron constructor
     * @since 0.0.2 outputUnit is now an injected dependency
     * @since 0.0.1
     */
    function Neuron(inputUnits, outputUnit, variables) {
        this.inputUnits = inputUnits;
        this.outputUnit = outputUnit;
        this.variableUnits = variables;
    }
    /**
     * Logic for the forward pass, similar to:
     * output = ax + by + ... + cz + d
     * Where a,b,...c,d are variable units stored in the neuron and x,y,...z are values of input units
     * @since 0.0.9 Forward pass now resets gradient
     * @since 0.0.8 Removed ReLU
     * @since 0.0.6 Added ReLU
     * @since 0.0.4 Fixed a bug where `i` would be compared to Unit[]
     * @since 0.0.1
     */
    Neuron.prototype.forward = function () {
        var output = 0;
        for (var i = 0; i < this.variableUnits.length; i++) {
            var variableUnit = this.variableUnits[i];
            variableUnit.gradient = 0;
            var coefficient = 1.0;
            if (this.inputUnits[i]) {
                coefficient = this.inputUnits[i].value;
            }
            output += coefficient * variableUnit.value;
        }
        this.outputUnit.value = output;
    };
    /**
     * Logic for the backward pass, first backdrops the gradients to the input units and then adjusts the stored
     * variable units using the step size
     * @since 0.0.9 Added `adjustment`
     * @since 0.0.8 Removed ReLU
     * @since 0.0.6 Minor tweaks to logic
     * @since 0.0.5 Added a rectifier for inputUnit.gradient
     * @since 0.0.4 Fixed a bug where `i` would be compared to Unit[]
     * @since 0.0.3 stepSize is now optional
     * @since 0.0.1
     */
    Neuron.prototype.backward = function (stepSize) {
        for (var i = 0; i < this.variableUnits.length; i++) {
            var variableUnit = this.variableUnits[i];
            var coefficient = 1.0;
            var adjustment = 0.0;
            if (this.inputUnits[i]) {
                coefficient = this.inputUnits[i].value;
                adjustment = variableUnit.value;
            }
            variableUnit.gradient += coefficient * this.outputUnit.gradient - adjustment;
            if (stepSize) {
                variableUnit.value += stepSize * variableUnit.gradient;
            }
        }
    };
    return Neuron;
}());
exports.Neuron = Neuron;
//# sourceMappingURL=Neuron.js.map