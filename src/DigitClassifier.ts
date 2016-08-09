import {DataParser, IDigitMatrix} from './DataParser';
import {NeuralNetwork} from './NeuralNetwork';
/**
 * A file containing all interfaces and classes related to the classifier matching images of handwritten digits to
 * their integer representation.
 *
 * @author Timur Kuzhagaliyev <tim@xaerus.co.uk>
 * @copyright 2016
 * @license https://opensource.org/licenses/mit-license.php MIT License
 * @version 0.0.1
 */

/**
 * Class responsible for setting up, testing and training a neural network
 * @since 0.0.1
 */
export class DigitClassifier {
    /**
     * An instance of NeuralNetwork that will be tested and trained
     * @since 0.0.1
     */
    private neuralNetwork: NeuralNetwork;

    /**
     * DigitClassifier constructor, mirrors that of a NeuralNetwork, except output count is always
     * @since 0.0.1
     */
    public constructor(inputCount: number, hiddenLayers: number[] = []) {
        this.neuralNetwork = new NeuralNetwork(inputCount, 1, hiddenLayers);
    }

    /**
     * Tests the classifier with the provided set of digit matrices, returns the accuracy of guesses over said set.
     * Prints each test case if `print` is set to true.
     * @since 0.0.1
     */
    public test(digitMatrices: IDigitMatrix[],
                outputOperation: (output: number) => number = (output) => output,
                print: boolean = false): number {
        let correctGuesses = 0;
        digitMatrices.forEach((matrix: IDigitMatrix) => {
            let output = this.neuralNetwork.runWith(matrix.matrix)[0];
            let displayOutput = output.toFixed(4);
            let parsedOutput = outputOperation(output);
            let correct: boolean = parsedOutput === matrix.digit;
            if (correct) {
                correctGuesses++;
            }
            if (print) {
                console.log(
                    '[TEST]   Expected -> ' + matrix.digit + '   Actual -> ' + displayOutput + ' (' + parsedOutput + ')'
                );
                console.log((correct ? '' : 'IN') + 'CORRECT GUESS');
                console.log('Image of the digit:');
                DataParser.printImage(matrix.matrix);
                console.log();
            }
        });
        return correctGuesses / digitMatrices.length;
    }

    /**
     * Trains the neural network using provided set of matrices. Repeats the process `iterationCount` times.
     * @since 0.0.1
     */
    public train(digitMatrices: IDigitMatrix[], stepSize: number, iterationCount: number) {
        for (let i = 0; i < iterationCount; i++) {
            digitMatrices.forEach((matrix: IDigitMatrix) => {
                this.neuralNetwork.trainWith(matrix.matrix, [matrix.digit], stepSize);
            });
        }
    }
}