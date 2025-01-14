const questions = [
    {
        question: "Who invented Java programming?",
        answers: [
            {text: "Guido van Rossum ", correct: false},
            {text: "James Gosling ", correct: true},
            {text: "Dennis Ritchie ", correct: false},
            {text: "Bjarne Stroustrup", correct: false},
        ]
    },
    {
        question: "Which component is used to compile, debug and execute the java programs?",
        answers: [
            {text: "JRE ", correct: false},
            {text: "JIT ", correct: false},
            {text: "JDK", correct: true},
            {text: "JVM", correct: false},
        ]
    },
    {
        question: "Which of the following is not an OOPS concept in Java?",
        answers: [
            {text: "Polymorphism", correct: false},
            {text: "Inheritance", correct: false},
            {text: "Encapsulation ", correct: false},
            {text: "Compilation", correct: true},
        ]
    },
    {
        question: "What is the extension of compiled java classes?",
        answers: [
            {text: ".txt", correct: false},
            {text: ".js", correct: false},
            {text: ".java", correct: false},
            {text: ".class", correct: true},
        ]  
    },
    {
        question: "Which exception is thrown when java is out of memory?",
        answers: [
            {text: "MemoryError", correct: false},
            {text: "OutOfMemoryError ", correct: true},
            {text: "MemoryOutOfBoundsException", correct: false},
            {text: "MemoryFullException", correct: false},
        ]  
    },
    {
        question: "Which one of the following is  not a java feature?",
        answers: [
            {text: "Object-Oriented", correct: false},
            {text: "Use of pointers", correct: true},
            {text: "Portable", correct: false},
            {text: "Dynamic and  Extensibile", correct: false},
        ]    
    },
    {
        
        question: "Which of these cannot be used for a variable?",
        answers: [
            {text: "identifier & keyword", correct: false},
            {text: "identifier", correct: false},
            {text: "keyword", correct: true},
            {text: "none of the mentioned", correct: false},
        ]    
    },
    {
        question: "Numbers of primitive data types in Java are?",
        answers: [
            {text: "6", correct: false},
            {text: "7", correct: false},
            {text: "9", correct: false},
            {text: "8", correct: true},
        ]    
    },
    {
        question: "What is the size of float and double in java?",
        answers: [
            {text: "32 and 32 ", correct: false},
            {text: "64 and 64 ", correct: false},
            {text: "64 and 32 ", correct: false},
            {text: "32 and 64 ", correct: true},
        ]    
    },
    {
        question: "When an array is passed to a method, what does the methos receive?",
        answers: [
            {text: "A copy of the array", correct: false},
            {text: "Length of the array ", correct: false},
            {text: "Copy of the first element", correct: false},
            {text: "The refence of the array", correct: true},
        ]    
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score  = 0;

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
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

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

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
