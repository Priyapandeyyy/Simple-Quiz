const questions = [
    {
        question: "'Dandia' is a popular dance of ?",
        answers: [
            {text: "Punjab", correct: false},
            {text: "Gujarat", correct: true},
            {text: "Tamil Nadu", correct: false},
            {text: "Maharashtra", correct: false},
        ]
    },
    {
        question: "Which animal is known as the 'Ship of the Desert'?",
        answers: [
            {text: "Camel", correct: true},
            {text: "Giraffe", correct: false},
            {text: "Polar Bear", correct: false},
            {text: "Elephant", correct: false},
        ]
    },
    {
        question: "Baby frog is known as ?",
        answers: [
            {text: "Calf", correct: false},
            {text: "Pup", correct: false},
            {text: "Tadpole", correct: true},
            {text: "Piglet", correct: false},
        ]
    },
    {
        question: "Which is the smallest continent in the world??",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },
    {
        question: "What is the capital of India?",
        answers: [
            {text: "Kolkata", correct: false},
            {text: "Bihar", correct: false},
            {text: "Goa", correct: false},
            {text: "New Dehi", correct: true},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();

