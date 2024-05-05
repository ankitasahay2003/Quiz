const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who was the first member of BTS?',
    answers: [
      { text: 'RM', correct: true },
      { text: 'SUGA', correct: false },
      { text: 'JIN', correct: false },
      { text: 'JUNGKOOK', correct: false }
    ]
  },
  {
    question: 'How many members are in BTS?',
    answers: [
      { text: 'one', correct: false },
      { text: 'five', correct: false },
      { text: 'seven', correct: true },
      { text: 'none', correct: false }
    ]
  },
  {
    question: 'What date was BTS’s debut stage?',
    answers: [
      { text: 'July 13th 2013', correct: false },
      { text: 'June 13th 2013', correct: true },
      { text: 'August 8th 2012', correct: false },
      { text: 'september 9th 2013', correct: false }
    ]
  },
  {
    question: 'What song got BTS their first music show win??',
    answers: [
      { text: 'Dynamite', correct: false },
      { text: 'DNA', correct: false },
      { text: 'Fire', correct: false },
      { text: 'I Need U', correct: true }
    ]
  }
]
