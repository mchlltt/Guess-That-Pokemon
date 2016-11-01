$(document).ready(function() {
    // Object with all questions and question data.
    var questions = [{
        id: 0,
        text: 'What is a good trivia question?0',
        answers: ['who knows', 'who cares', 'idek', 'ummm'],
        src: 'q1.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 1,
        text: 'er what is happening',
        answers: ['1', '2', '3', '4'],
        src: 'q2.png',
        alt: 'bloop',
        correctAnswerIndex: 0
    }, {
        id: 2,
        text: 'What is a good trivia question?2',
        answers: ['who knows', 'who cares', 'idek', 'ummm'],
        src: 'q1.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 3,
        text: 'What is a good trivia question?3',
        answers: ['who knows', 'who cares', 'idek', 'ummm'],
        src: 'q3.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 4,
        text: 'What is a good trivia question?4',
        answers: ['who knows', 'who cares', 'idek', 'ummm'],
        src: 'q4.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 5,
        text: 'What is a good trivia question?5',
        answers: ['who knows', 'who cares', 'idek', 'ummm'],
        src: 'q5.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 6,
        text: 'What is a good trivia question?6',
        answers: ['who knows', 'who cares', 'idek', 'ummm'],
        src: 'q6.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 7,
        text: 'What is a good trivia question?7',
        answers: ['who knows', 'who cares', 'idek', 'ummm'],
        src: 'q7.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 8,
        text: 'What is a good trivia question?8',
        answers: ['who knows', 'who cares', 'idek', 'ummm'],
        src: 'q8.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }, {
        id: 9,
        text: 'What is a good trivia question?9',
        answers: ['who knows', 'who cares', 'idek', 'ummm'],
        src: 'q9.png',
        alt: 'boop doop',
        correctAnswerIndex: 2
    }];

    // Variable accessible in all scopes with current question content.
    var currentQuestion = {};


    // Game logic object.
    var game = {
        // Variables
        questionsUnasked: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        answersIncorrect: 0,
        answersCorrect: 0,
        answersTimedOut: 0,

        // Methods
        selectQuestion: function() {
            // Randomly select one of the unasked questions.
            var questionIndex = Math.floor(Math.random() * game.questionsUnasked.length);
            // Get its ID in questions.
            var id = game.questionsUnasked[questionIndex];
            // Set the currentQuestion object to this question.
            var lookup = {};
            for (var i = 0; i < questions.length; i++) {
                lookup[questions[i].id] = questions[i];
            }
            currentQuestion = lookup[id];
            // Remove the question's ID from the unasked questions.
            game.questionsUnasked.splice(questionIndex, 1);
        },

        isCorrect: function(answerIndex) {
            // Check whether the answer given is the correct answer.
            if (answerIndex === currentQuestion.correctAnswerIndex) {
                return true;
            } else {
                return false;
            }
        },

        updateScores: function(correct) {
            // Increment appropriate score counter variable.
            if (correct) {
                game.answersCorrect++;
            } else if (!correct) {
                game.answersIncorrect++;
            } else {
                game.answersTimedOut++;
            }
        }
    };

    var count = -1;

    // Timeout and interval object
    var timer = {
        start: function() {
            timer.countDown();
            counter = setInterval(timer.countDown, 1000);
        },
        stop: function() {
            clearInterval(counter);
            count = -1;
        },
        countDown: function() {
            count++;
            DOMFunctions.displayTimer(count);
            if (count == 30) {
                timer.stop();
            }
        },
    };


    // DOM writing object
    var DOMFunctions = {
        displayTimer: function(time) {
            $('#timer').text(30 - time);
        },
        displayQuestion: function() {
            $('#question').text(currentQuestion.text);
            $('#0').text(currentQuestion.answers[0]);
            $('#1').text(currentQuestion.answers[1]);
            $('#2').text(currentQuestion.answers[2]);
            $('#3').text(currentQuestion.answers[3]);
        },
        displayAnswer: function(correct) {
            $('.question-display').hide();
            $('.timer').hide();
            $('.question-result').show();
            $('#question-image').attr('src', currentQuestion.src);
            $('#question-image').attr('alt',currentQuestion.alt);
            if (correct) {
                $('#question-win-loss').text('Correct!');
            } else {
                $('#question-win-loss').text('Incorrect...');
            }
        },
        displayResults: function() {

        },
        displayNewGame: function() {

        },
        callDOMFunctions: function(event,correct) {
            if (event === 'startGame') {
                $('.start').hide();
                DOMFunctions.displayQuestion();
            } else if (event === 'questionAnswered') {
                DOMFunctions.displayAnswer(correct);
            } else if (event === 'newQuestion') {
                console.log('newq');
            }
        }

    };


    // Function Calls
    // Unclear whether I need anything here since it starts with the static start page.

    // On-click events
    $('#start-button').on('click', function() {
        game.selectQuestion();
        DOMFunctions.callDOMFunctions(event = 'startGame');
        timer.start();
    });

    // When you select an answer,
    $('.option').on('click', function() {
        var correct = game.isCorrect(parseInt(this.id,10));
        timer.stop();
        DOMFunctions.callDOMFunctions(event = 'questionAnswered',correct = correct);
        game.updateScores(correct);
        setTimeout(DOMFunctions.callDOMFunctions(event = 'newQuestion'), 3000);
    });

    // When you click start over button,
    // Call game.resetGame();
    // Call DOM writer with event 'restart';

});
