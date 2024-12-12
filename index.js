// Questions Array
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyperloop Machine Language",
            "Hyper Transfer Markup Language"
        ],
        answer: 0 // Index of the correct answer
    },
    {
        question: "What is the purpose of CSS in web development?",
        options: [
            "To structure web pages",
            "To style and layout web pages",
            "To program the backend",
            "To connect to the database"
        ],
        answer: 1
    },
    {
        question: "Which programming language is primarily used for web development?",
        options: [
            "Python",
            "Java",
            "JavaScript",
            "C++"
        ],
        answer: 2
    },
    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Simple Query Logic",
            "Sequential Query Language",
            "Structured Quick Language"
        ],
        answer: 0
    },
    {
        question: "Which of these is a JavaScript framework?",
        options: [
            "React",
            "Laravel",
            "Django",
            "Flask"
        ],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const questionPara = document.getElementById("para");
const optionButtons = [
    document.getElementById("option1"),
    document.getElementById("option2"),
    document.getElementById("option3"),
    document.getElementById("option4")
];
const nextButton = document.getElementById("button");
const questionCounter = document.getElementById("para2");

// Shuffle questions
function shuffleQuestions() {
    for (let i = quizQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quizQuestions[i], quizQuestions[j]] = [quizQuestions[j], quizQuestions[i]];
    }
}

// Load a question
function loadQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionPara.textContent = currentQuestion.question;
    optionButtons.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.style.backgroundColor = ""; // Reset background color
        button.disabled = false; // Enable buttons
        button.style.display = "block"; // Ensure buttons are visible
    });
    questionCounter.textContent = `${currentQuestionIndex + 1} of ${quizQuestions.length} Question`;
}

// Handle answer selection
function handleOptionClick(selectedIndex) {
    const correctIndex = quizQuestions[currentQuestionIndex].answer;
    optionButtons.forEach((button, index) => {
        if (index === correctIndex) {
            button.style.backgroundColor = "green";
            button.style.display = "block"; // Show only correct answer
        } else if (index === selectedIndex) {
            button.style.backgroundColor = "red"; // Highlight wrong selection
            button.style.display = "block"; // Show wrong answer
        } else {
            button.style.display = "none"; // Hide unselected options
        }
        button.disabled = true; // Disable buttons after selection
    });
    if (selectedIndex === correctIndex) {
        score++;
    }
}

// Handle next button click
function handleNextClick() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        displayResult();
    }
}

// Display final result
function displayResult() {
    questionPara.textContent = `Quiz Completed! Your score is ${score} out of ${quizQuestions.length}.`;
    optionButtons.forEach(button => {
        button.style.display = "none";
    });
    nextButton.style.display = "none";
    questionCounter.style.display = "none";
}

// Event Listeners
optionButtons.forEach((button, index) => {
    button.addEventListener("click", () => handleOptionClick(index));
});
nextButton.addEventListener("click", handleNextClick);

// Initialize Quiz
shuffleQuestions();
loadQuestion();