import Menu from "./components/Menu";
import Question from "./components/Question";
import Result from "./components/Result";

import "./style.css";

const gameLayer = document.getElementById("game-layer");
let score = 0;

Array.prototype.getRandom = function (n) {
    var result = new Array(n),
        len = this.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = this[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
};

function initGame(countries) {
    gameLayer.innerHTML = new Menu().render();

    const startBtn = document.getElementById("start-game");
    startBtn.addEventListener("click", startGame);
}

function startGame() {
    const region = document.getElementById("region").value;
    (async function () {
        try {
            const countries = await fetch(
                `https://restcountries.eu/rest/v2/${
                    region == "all" ? "all" : "region/" + region
                }?fields=flag;name`
            )
                .then((response) => response.json())
                .then((data) => data);
            //returns [{flag: ..., name: ...},...]

            const questionNum = Number(
                document.getElementById("questions-number").value
            );
            const optionsArr = getOptionsArr(countries, questionNum);

            // index of a question
            let i = 0;

            runQustion();
            function runQustion() {
                const options = optionsArr[i];
                const flag = new Image();
                gameLayer.innerHTML = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>`;
                flag.onload = () => {
                    const question = new Question(flag.src, options.options);

                    gameLayer.innerHTML = question.render();
                    runBar();

                    const optionsTags = document.querySelectorAll(".option");

                    optionsTags.forEach((option) => {
                        option.addEventListener("click", choose);
                    });
                };
                flag.src = options.answer.flag;
            }

            // Progress bar
            function runBar() {
                const bar = document.getElementById("bar");
                const begin = new Date();
                const id = setInterval(() => {
                    const now = new Date();
                    const passedTime = (now - begin) / 1000;
                    if (passedTime >= 10) {
                        clearInterval(id);
                        showRight();
                        delListener(choose);
                        addNextBtn();
                    }
                    bar.style.width = String((passedTime / 10) * 100) + "%";
                }, 10);
                return id;
            }

            // if user clicked on an option
            function choose() {
                if (isRight(this)) {
                    this.style.backgroundColor = "#4CAF50";
                    score++;
                } else {
                    this.style.backgroundColor = "#FF5252";
                    showRight();
                }
                delListener(choose);
                // stop bar
                clearInterval(1);
                addNextBtn();
            }

            function addNextBtn() {
                const questionTag = document.getElementById("question");
                questionTag.innerHTML += `
                <button id="question-btn" type="button">${
                    i == questionNum - 1 ? "Finish" : "Next"
                }</button>`;
                const nextBtn = document.getElementById("question-btn");
                nextBtn.addEventListener("click", () => {
                    if (i == questionNum - 1) {
                        showResults();
                    } else {
                        i++;
                        runQustion();
                    }
                });
                return nextBtn;
            }

            function isRight(op) {
                if (op.textContent === optionsArr[i].answer.name) return true;
            }
            function showRight() {
                const optionsTags = document.querySelectorAll(".option");
                optionsTags.forEach((op) => {
                    if (isRight(op)) {
                        op.style.backgroundColor = "#4CAF50";
                    }
                });
            }

            function delListener(listener) {
                const optionsTags = document.querySelectorAll(".option");
                optionsTags.forEach((op) => {
                    op.removeEventListener("click", listener);
                });
            }

            function showResults() {
                gameLayer.innerHTML = new Result(score, questionNum).render();
                const replayBtn = document.getElementById("replay-btn");
                replayBtn.addEventListener("click", () => {
                    i = 0;
                    score = 0;
                    initGame();
                });
            }
        } catch (e) {
            console.error(e);
        }
    })();
}
// returns an array of options variations 
function getOptionsArr(countries, questionNum) {
    const optionsArr = [];
    for (let i = 0; i < questionNum; i++) {
        const options = countries.getRandom(4);
        const x = Math.floor(Math.random() * options.length);
        const answer = options[x]; // add a write answer in the random place in the options
        optionsArr.push({ answer: answer, options: options });
    }
    return optionsArr;
}


initGame();
