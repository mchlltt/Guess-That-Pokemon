$(document).ready(function() {

    // AJAX parameters
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
            // Verify that the game is not done.
            if (game.questionsAsked === 10) {
                DOMFunctions.callDOMFunctions('gameComplete');
            } else {
                // Increment the number of questions asked.
                game.questionsAsked++;
                // Randomly select 4 unique numbers between 1 and 721.
                var idArray = [];
                while (idArray.length < 4) {
                    var pokemonID = Math.ceil(Math.random() * 721);
                    if (idArray.indexOf(pokemonID) !== -1) continue;
                    idArray.push(pokemonID);
                }
                // Randomly select which of the 4 numbers will be the answer ID.
                currentQuestion.answerIndex = Math.floor(Math.random() * 4);
                // For each ID, push the name and id to the possible answers array.
                idArray.forEach(function(element) {
                    // Query Pokeapi
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
            // Once the fourth AJAX call has been made, start the question.
            if (currentQuestion.ids.length === 4) {
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
            // Clear answer and answer ID arrays.
            currentQuestion.answers = [];
            currentQuestion.ids = [];
        },

        resetGame: function() {
            // Reset game-wide variables.
            game.questionsAsked = 0;
            game.answersCorrect = 0;
            game.answersIncorrect = 0;
            game.answersTimedOut = 0;
        }
    };

    // Timeout and interval object
    var timer = {
        // Count begins at 8.
        count: 9,
        start: function() {
            timer.decrement();
            counter = setInterval(timer.decrement, 1000);
        },
        // Decrease time by one per second. If the time hits 0, stop timer.
        decrement: function() {
            timer.count--;
            DOMFunctions.callDOMFunctions(event = 'countDown', correct = null, timeRemaining = timer.count);
            if (timer.count === 0) {
                timer.stop();
                DOMFunctions.callDOMFunctions(event = 'questionAnswered', correct = '');
                game.updateScores();
            }
        },
        // Clear interval and reset count.
        stop: function() {
            clearInterval(counter);
            timer.count = 9;
        },
    };


    // DOM writing object
    var DOMFunctions = {
        displayTimer: function() {
            $('.timer').css('display', 'block');
        },
        displayTimeLeft: function(timeRemaining) {
            $('#timer').text(timeRemaining);
        },
        displayLoadingGIF: function() {
            $('.timer').css('display', 'block');
            $('.loading-image').css('display', 'block');
        },
        displayQuestion: function() {
            // Hide loading image, show question
            $('.loading-image').hide();
            $('.question-display').show();
            // Make sure content stays a fixed height.
            $('.content').addClass('static-content');
            // Show answer options, empty any previous options.
            $('.answer-display').show();
            $('.answer-options').empty();
            // Set image src and alt.
            $('.question-image').attr('src', 'assets/images/' + currentQuestion.ids[currentQuestion.answerIndex] + '.png');
            $('.question-image').attr('alt', 'A mystery Pokemon\'s silhouette');
            // Add each question.
            for (var i = 0; i < currentQuestion.answers.length; i++) {
                option = $('<p>');
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
            // Remove silhouette class.
            $('.question-image').toggleClass('silhouette');
            // Set image alt.
            $('.question-image').attr('alt', 'An image of ' + currentQuestion.answers[currentQuestion.answerIndex]);
            // Show whether the answer was correct.
            if (correct === true) {
                $('#question-win-loss').text('Correct!');
            } else if (correct === false) {
                $('#question-win-loss').text('Incorrect...');
            } else {
                $('#question-win-loss').text('Time\'s Up!');
            }
            // Start selecting a new question a second later.
            setTimeout(game.selectQuestion, 1000);
        },
        hideAnswer: function() {
            // Hide answer section.
            $('.timer').show();
            $('.question-result').hide();
            // Retoggle silhouette class.
            $('.question-image').toggleClass('silhouette');
        },
        displayResults: function() {
            $('.question-display').hide();
            $('.timer').hide();
            $('.game-results').show();
            // Display answer counts.
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
        callDOMFunctions: function(event, correct, timeRemaining) {
            // Pipe calls from outside the object to the correct function.
            if (event === 'startGame') {
                $('.start').hide();
                DOMFunctions.displayLoadingGIF();
            } else if (event === 'newQuestion') {
                DOMFunctions.displayQuestion();
                DOMFunctions.hideAnswer();
                DOMFunctions.displayTimer();
            } else if (event === 'countDown') {
                DOMFunctions.displayTimeLeft(timeRemaining);
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
        // Call start game DOM functions.
        DOMFunctions.callDOMFunctions(event = 'startGame');
        // Select a question.
        game.selectQuestion();
    });

    // When an answer is clicked.
    $(document).on('click', '.option', function() {
        // Record name attribute from selected answer.
        var answerText = $(this).data('name');
        // Check if the answer is correct.
        var answerCorrectness = game.isCorrect(answerText);
        // Stop timer.
        timer.stop();
        // Call DOM question answered functions.
        DOMFunctions.callDOMFunctions(event = 'questionAnswered', correct = answerCorrectness);
        // Update scores based on result.
        game.updateScores(answerCorrectness);
    });

    // When the start over button is clicked.
    $('#restart-button').on('click', function() {
        // Reset game variables.
        game.resetGame();
        // Reset DOM.
        DOMFunctions.callDOMFunctions(event = 'restartClicked');
    });

});
