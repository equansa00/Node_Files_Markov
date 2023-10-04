/** Textual markov chain generator */


class MarkovMachine {

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.chains = {};
    this.makeChains();
  }

  makeChains() {
    for (let i = 0; i < this.words.length; i++) {
      if (!this.chains[this.words[i]]) {
        this.chains[this.words[i]] = [];
      }

      if (i === this.words.length - 1) {
        this.chains[this.words[i]].push(null);
      } else {
        this.chains[this.words[i]].push(this.words[i + 1]);
      }
    }
  }

  makeText(numWords = 100) {
    let keys = Object.keys(this.chains);
    let currentWord = keys[Math.floor(Math.random() * keys.length)];
    let result = [currentWord];

    while (result.length < numWords && currentWord) {
      let nextWords = this.chains[currentWord];
      currentWord = nextWords[Math.floor(Math.random() * nextWords.length)];
      if (currentWord) result.push(currentWord);
    }

    return result.join(" ");
  }
}

module.exports = MarkovMachine;