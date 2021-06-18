export default class Result {
    constructor(score, questionsNumber) {
        this.score = score;
        this.questionsNumber = questionsNumber;
        [this.rating, this.color] = this.getRating();
    }

    getRating() {
        let per = this.score / this.questionsNumber;
        if (per <= 0.3) {
            return ["You need to study more", "#FF5252"];
        } else if (per <= 0.7) {
            return ["Not bad", "#FFEB3B"];
        } else if (per <= 0.9) {
            return ["Excellent!", "#4CAF50"];
        } else {
            return ["Great!!!", "#E040FB"];
        }
    }

    render() {
        return `
      <div id="result">
        <h2 id="result-title">${this.rating}</h2>
        <p id="score"><span style="color: ${this.color}">${this.score}</span> / ${this.questionsNumber}</p>
        <a id="replay-btn" href="">Replay</a>
      </div>
      `;
    }
}
