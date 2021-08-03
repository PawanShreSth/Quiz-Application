import Quiz from './Quiz.js';
import Question from './Question.js';

const question = document.querySelector('.jabquiz__question');
const ulEL = document.querySelector('.jabquiz__choices');
const progressBar = document.querySelector('.progress__inner');
const nextBtn = document.querySelector('.next');
const restartBtn = document.querySelector('.restart');

const q1 = new Question("What's 2 + 2?", [2, 3, 4, 5], 2);
const q2 = new Question(
  'First President Of US?',
  ['AL', 'George', 'Barrack', 'Johnny'],
  1
);

const qArray = [q1, q2];

let choosenAnswer = [];

const myQuiz = new Quiz(qArray);

restartBtn.addEventListener('click', e => {
  myQuiz.currentIndex = 0;
  progressBar.style.width = '0%';
  choosenAnswer = [];
  renderQuiz();
});

nextBtn.addEventListener('click', e => {
  let inputs = document.querySelectorAll('.jabquiz__input');
  console.log(myQuiz);
  if (Array.from(inputs).every(a => a.checked === false)) {
    return;
  } else {
    const index = Array.from(inputs).findIndex(a => a.checked === true);
    choosenAnswer.push(index);
  }

  if (myQuiz.hasEnded()) {
    ulEL.innerText = '';
    myQuiz.currentIndex = 0;

    choosenAnswer.forEach(ans => myQuiz.guess(ans));
    ulEL.innerHTML = `You scored ${myQuiz.score} out of ${myQuiz.questions.length}`;
    if (myQuiz.score === 1) {
      progressBar.style.width = '50%';
    } else if (myQuiz.score === 2) {
      progressBar.style.width = '100%';
    }
    return;
  }

  renderQuiz();
});

document.addEventListener('change', e => {});

function renderQuiz() {
  ulEL.innerText = '';
  const template = document.querySelector('template');
  const templateClone = template.content.cloneNode(true);

  question.innerText = myQuiz.getCurrentQuestion().question;

  const liEL = templateClone.querySelectorAll('.jabquiz__choice');

  const choices = myQuiz.getCurrentQuestion().choices;

  let index = 0;
  liEL.forEach(li => {
    const i = li.querySelector('i');
    const label = li.querySelector('.jabquiz__label');

    label.innerText = choices[index++];
    label.prepend(i);
    ulEL.append(li);
  });
  myQuiz.nextIndex();
}

renderQuiz();
