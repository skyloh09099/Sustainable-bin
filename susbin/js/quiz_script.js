const questions = [
    {
        question: "Which of the following organizations promotes recycling efforts in Singapore?",
        answers: [
        { text: "Singapore Tourism Board", correct: false},
        { text: "National Environmental Agency (NEA)", correct: true},
        { text: "Singapore Food Agency", correct: false},
        { text: "Ministry of Manpower", correct: false},
        ]
    },
    {
        question: "What should you do before recycling a plastic bottle in Singapore?",
        answers: [
        { text: "Smash it", correct: false},
        { text: "Tear off the label", correct: false},
        { text: "Leave it full of liquid", correct: false},
        { text: "Wash and dry it", correct: true},
        ]
    },
    {
        question: "Which of the following can be recycled in Singapore’s blue recycling bins?",
        answers: [
        { text: "Used tissue paper", correct: false},
        { text: "Styrofoam boxes", correct: false},
        { text: "Empty plastic bottles", correct: true},
        { text: "Food scraps", correct: false},
        ]
    },
    {
        question: "Which of the following items is considered a recyclable in Singapore?",
        answers: [
        { text: "Metal cans", correct: true},
        { text: "Used diapers", correct: false},
        { text: "Used diapers", correct: false},
        { text: "Ceramic dishes", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
    
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;  
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question; 

// display correct answer
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        // add true or false in dataset
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click",selectAnswer);
    });
}

// reset previous ques & ans
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
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
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "True"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You score ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();


