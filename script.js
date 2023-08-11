let count=11;
let countdown;

const questions = [
    {
        question : "Who will Elon Musk fight in UFC?",
        answers: [
            {text: "Mark Zuckerberg", correct:true},
            {text: "The Great Khali", correct:false},
            {text: "Khabib", correct:false},
            {text: "Conor McGregor", correct:false}
        ]
    },
    {
        question : "Who is the president of United States?",
        answers: [
            {text: "Narendra Modi", correct:false},
            {text: "Barack Obama", correct:false},
            {text: "Donald Trump", correct:false},
            {text: "Joe Biden", correct:true}
        ]
    },
    {
        question : "Which is Shah Rukh Khan's son among these?",
        answers: [
            {text: "Salman Khan", correct:false},
            {text: "Aamir Khan", correct:false},
            {text: "Aryan Khan", correct:true},
            {text: "Akshay Kumar", correct:false}
        ]
    },
    {
        question : "Which country has the largest population?",
        answers: [
            {text: "India", correct:true},
            {text: "Germany", correct:false},
            {text: "China", correct:false},
            {text: "United States", correct:false}
        ]
    },
    {
        question : "Which of these influencers is popular among aliens?",
        answers: [
            {text: "Prajakta Kohli", correct:false},
            {text: "Bhuvan Bam", correct:false},
            {text: "Ranveer Allahbadia", correct:true},
            {text: "Arpit Bala", correct:false}
        ]
    },
    {
        question : "Who is the new name of facebook?",
        answers: [
            {text: "Microsoft", correct:false},
            {text: "Meta", correct:true},
            {text: "Tesla", correct:false},
            {text: "Google", correct:false}
        ]
    },
    {
        question : "Which entreprenour did'nt feature on Shark Tank India in 2023?",
        answers: [
            {text: "Anupam Mittal", correct:false},
            {text: "Peyush Bansal", correct:false},
            {text: "Namita Thapar", correct:false},
            {text: "Ashneer Grover", correct:true}
        ]
    },
    {
        question : "Which of these apps is launched by meta to challenge twitter?",
        answers: [
            {text: "Threads", correct:false},
            {text: "Instagram", correct:true},
            {text: "Messenger", correct:false},
            {text: "ChatGpt", correct:false}
        ]
    },
    {
        question : "Which among these is the longest anime?",
        answers: [
            {text: "Attack On Titan", correct:false},
            {text: "Full Metal Alcheimist", correct:false},
            {text: "Demon Slayer", correct:false},
            {text: "One Piece", correct:true}
        ]
    }
]

const questionElement = document.getElementById('question')
const answerButton = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')
let quizTimer = document.getElementById('quiz-timer')
let quizTime = document.getElementById('quiz-time')
let timer

let currentQuestionIndex = 0
let score=0

function startQuiz(){
    quizTime.style.visibility = "visible"
    currentQuestionIndex=0
    score=0
    nextButton.innerHTML = "Next"
    showQuestion()
    count = 11;
    clearInterval(countdown)
    timerDisplay()
}

function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex+1
    questionElement.innerHTML=questionNo+ ". " + currentQuestion.question

    

    currentQuestion.answers.forEach(answer=>{
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add('btn')
        answerButton.appendChild(button)
        if(answer.correct){
            button.dataset.correct=answer.correct
        }
        button.addEventListener('click',selectAnswer)
    })
    count = 11;
    timerDisplay()
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    clearInterval(countdown)
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"
    if(isCorrect){
        selectedBtn.classList.add("correct")
        score+=1
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add('correct')
        }
        button.disabled = true
    })
    nextButton.style.display='block';
}


nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton()
    }
    else{
        startQuiz()
    }
})

function showScore(){
    resetState()
    quizTime.style.visibility="hidden"
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`
    nextButton.innerHTML = "Play Again"
    nextButton.style.display= 'block'
}

function handleNextButton(){
    currentQuestionIndex+=1
    if(currentQuestionIndex<questions.length){
        showQuestion()
    }else{
        showScore()
    }
}


const timerDisplay = ()=>{
    countdown  = setInterval(()=>{
        count--
        quizTimer.innerHTML = `${count}s`
        if(count==0){
            clearInterval(countdown)
            handleNextButton()
        }
    },1000)
}
startQuiz()
