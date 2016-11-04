$(document).ready(function() {

    var queryMethod = 'GET';
    var queryURL = 'http://pokeapi.co/api/v2/pokemon/';

    // Global variable with current question content.
    var currentQuestion = {
        name: '',
        ids: [],
        answers: [],
        answerIndex: ''
    };

    // Global variable with current scores.
    var answersCorrect = 0;
    var answersIncorrect = 0;
    var answersTimedOut = 0;


    // Game logic object.
    var game = {
        // Variables
        questionsAsked: 0,
        // Methods
        selectQuestion: function() {
            // Verify that there are questions left to answer.
            if (game.questionsAsked === 10) {
                DOMFunctions.callDOMFunctions('gameComplete');
            } else {
                game.questionsAsked++;
                // Randomly select 4 unique numbers between 1 and 721.
                var idArray = [];
                while (idArray.length < 4) {
                    var pokemonID = Math.ceil(Math.random() * 721);
                    if (idArray.indexOf(pokemonID) !== -1) continue;
                    idArray.push(pokemonID);
                }
                // Randomly select which of the IDs will be the answer.
                currentQuestion.answerIndex = Math.floor(Math.random() * 4);
                // Push the name and id of all four elements to the possible answers array.
                idArray.forEach(function(element) {
                    $.ajax(url = queryURL + element + '/', method = queryMethod)
                        .done(function(response) {
                            currentQuestion.answers.push(response.species.name);
                            currentQuestion.ids.push(response.id);
                            game.startQuestion();
                        });
                });
            }
        },

        startQuestion: function() {
            if (currentQuestion.ids.length === 4) {
                $('.loading-image').hide();
                $('.content').css('min-height','80vh');
                DOMFunctions.callDOMFunctions(event = 'newQuestion');
                timer.start();
            }
        },

        isCorrect: function(answer) {
            // Check whether the answer given is the correct answer.
            if (answer === currentQuestion.answers[currentQuestion.answerIndex]) {
                return true;
            } else {
                return false;
            }
        },

        updateScores: function(correct) {
            // Increment appropriate score counter variable.
            if (correct === true) {
                answersCorrect++;
            } else if (correct === false) {
                answersIncorrect++;
            } else {
                answersTimedOut++;
            }
            currentQuestion.answers = [];
            currentQuestion.ids = [];
        },

        resetGame: function() {
            game.questionsAsked = 0;
            game.answersCorrect = 0;
            game.answersIncorrect = 0;
            game.answersTimedOut = 0;
        }
    };

    // Timeout and interval object
    var timer = {
        count: 9,
        start: function() {
            timer.decrement();
            counter = setInterval(timer.decrement, 1000);
        },
        decrement: function() {
            timer.count--;
            DOMFunctions.displayTimer(timeRemaining = timer.count);
            if (timer.count === 0) {
                timer.stop();
                DOMFunctions.callDOMFunctions(event = 'questionAnswered', correct = '');
                game.updateScores();
            }
        },
        stop: function() {
            clearInterval(counter);
            timer.count = 9;
        },
    };


    // DOM writing object
    var DOMFunctions = {
        displayTimer: function(timeRemaining) {
            $('#timer').text(timeRemaining);
        },
        displayLoadingGIF: function() {
            $('.loading-image').css('display', 'block');
        },
        displayQuestion: function() {
            $('.answer-display').show();
            $('.answer-options').empty();
            $('.question-image').attr('src', 'assets/images/' + currentQuestion.ids[currentQuestion.answerIndex] + '.png');
            $('.question-image').attr('alt', 'A mystery Pokemon\'s silhouette');
            for (var i = 0; i < currentQuestion.answers.length; i++) {
                option = $('<h3>');
                option.text(currentQuestion.answers[i]);
                option.addClass('text-center option');
                option.attr('role', 'button');
                option.attr('data-name', currentQuestion.answers[i]);
                $('.answer-options').append(option);
            }
        },
        displayAnswer: function(correct) {
            $('.timer').hide();
            $('.answer-display').hide();
            $('.question-result').show();
            $('#correct-answer').text('It\'s ' + currentQuestion.answers[currentQuestion.answerIndex] + '!');
            $('.question-image').toggleClass('silhouette');
            $('.question-image').attr('alt', 'An image of ' + currentQuestion.answers[currentQuestion.answerIndex]);
            if (correct === true) {
                $('#question-win-loss').text('Correct!');
            } else if (correct === false) {
                $('#question-win-loss').text('Incorrect...');
            } else {
                $('#question-win-loss').text('Time\'s Up!');
            }
            setTimeout(game.selectQuestion, 2000);
        },
        hideAnswer: function() {
            $('.question-display').show();
            $('.timer').show();
            $('.question-result').hide();
            $('.question-image').toggleClass('silhouette');
        },
        displayResults: function() {
            $('.question-display').hide();
            $('.timer').hide();
            $('.game-results').show();
            $('#questions-correct').text('Correct: ' + answersCorrect);
            $('#questions-incorrect').text('Incorrect: ' + answersIncorrect);
            $('#questions-unanswered').text('Unanswered: ' + answersTimedOut);
            $('.restart').show();
        },
        displayNewGame: function() {
            $('.restart').hide();
            $('.game-results').hide();
            $('.start').show();
        },
        callDOMFunctions: function(event, correct) {
            if (event === 'startGame') {
                $('.start').hide();
                DOMFunctions.displayLoadingGIF();
            } else if (event === 'newQuestion') {
                DOMFunctions.displayQuestion();
                DOMFunctions.hideAnswer();
            } else if (event === 'questionAnswered') {
                DOMFunctions.displayAnswer(correct);
            } else if (event === 'gameComplete') {
                DOMFunctions.hideAnswer();
                DOMFunctions.displayResults();
            } else if (event === 'restartClicked') {
                DOMFunctions.displayNewGame();
            }
        }
    };

    // On-click events
    // When the start button is clicked.
    $('#start-button').on('click', function() {
        DOMFunctions.callDOMFunctions(event = 'startGame');
        game.selectQuestion();
    });

    // When an answer is clicked.
    $(document).on('click', '.option', function() {
        var answerText = $(this).data('name');
        var answerCorrectness = game.isCorrect(answerText);
        timer.stop();
        DOMFunctions.callDOMFunctions(event = 'questionAnswered', correct = answerCorrectness);
        game.updateScores(answerCorrectness);
    });

    // When the start over button is clicked.
    $('#restart-button').on('click', function() {
        game.resetGame();
        DOMFunctions.callDOMFunctions(event = 'restartClicked');
    });

});
