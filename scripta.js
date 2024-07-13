let currentQuestionIndex = 0;
let score = 0;
let questions = [];

async function fetchQuestions() {
    const url = 'https://opentdb.com/api.php?amount=10&type=multiple';

    try {
        const response = await fetch(url);
        const data = await response.json();
        questions = data.results;
        displayQuestion();
    } catch (error) {
        console.error('Error fetching the quiz data:', error);
    }
}

function displayQuestion() {
    const container = document.querySelector('.questionbox');
    container.innerHTML = '';
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const questionElement = document.createElement('div');
        questionElement.className = 'question';

        // Display the question 
        const questionText = document.createElement('p');
        questionText.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
        questionElement.appendChild(questionText);

        
        const options = [...question.incorrect_answers, question.correct_answer];
        options.sort(() => Math.random() - 0.5);

        options.forEach((option, i) => {
            const optionElement = document.createElement('button');
            optionElement.textContent = option;
            optionElement.onclick = () => checkAnswer(option, question.correct_answer);
            questionElement.appendChild(optionElement);
        });

        container.appendChild(questionElement);
    } else {
        displayScore();
    }
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        score += 10;
    }
    currentQuestionIndex++;
    displayQuestion();
}

function displayScore() {
    const container = document.querySelector('.questionbox');
    container.innerHTML = `<p>Your final score is: ${score}</p>`;
}

document.querySelector('button').onclick = fetchQuestions;
