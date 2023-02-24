class Level {
  constructor(inputCount, outputCount) {
    // layer of input neurons, layer of output neurons
    // we can implement those as arrays

    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    // bias = the value above the neuron will fire
    this.biases = new Array(outputCount);
    //   we will connect every input neuron to every output neuron
    //

    this.weights = [];
    for (let i = 0; i < inputCount; i++) {
      this.weights[i] = new Array(outputCount);
    }
    Level.#randomize(this);
  }
  static #randomize(level) {
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1;
        //   easy way to get a value between -1 and 1
        // negative weights can send messages to stop, positives can send messages to go
      }
    }
    for (let i = 0; i < level.biases.length; i++) {
        level.biases[i] = Math.random() * 2 - 1;
    }
  }
    
  static feedForward(givenInputs, level){
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    }
    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0;
      for (let j = 0; j < level.inputs.length; j++) {
        // sum += level.inputs[j] * level.weights[0)
  }
}
  }
}
