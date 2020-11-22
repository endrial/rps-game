var gameModule = (function () {
    $(function() {
        var playerChoice,
            computerChoice,
            winner,
            round = 1,
            playerScore = 0,
            computerScore = 0,
            bestOf,
            overallResultClass,
            overallResultText,
            character,
            choices = ['rock', 'paper', "scissors"];

        var playerWinsText = "You win the round!",
            computerWinsText = "Computer wins the round!",
            tieText = "It's a Tie!",
            overallPlayerWinText = "<h2>Well Done!</h2> <p>You won against the computer.</p>",
            overallComputerWinText = "<h2>You Lose...</h2> <p>The computer has defeated you</p>",
            overallTieText = "<h2>It's a draw!</h2> <p>Good effort.</p>";

        function setCharacter(div, className) {
            character = $(div).data('character');
            $(className).addClass(character);
        }

        function nextScreen(div) {
            div.parents('.starter-screen').hide().next().addClass('animate-in');
        }

        function computerDecision() {
            var randomChoice = Math.floor(Math.random() * choices.length);
            return choices[randomChoice];
        }

        function playGame(playerChoice) {
            computerChoice = computerDecision();
            round++;
            $('.player-choice-icon').attr('class', 'player-choice-icon ' + playerChoice);
            $('.computer-choice-icon').attr('class', 'computer-choice-icon ' + computerChoice);

            winner = decideWinner(playerChoice, computerChoice);
            setValues(playerChoice, computerChoice, winner);
        }

        function setValues(playerChoice, computerChoice, winnerText) {
            $('.player-choice').text(playerChoice);
            $('.computer-choice').text(computerChoice);
            $('.winner').text(winnerText);

            if(round !== 1) {
                setTimeout(function(){
                    setScore();
                }, 4000);
            } else {
                setScore();
                $('.round').text(round);
            }
        }

        function setScore() {
            $('.player-score').text(playerScore);
            $('.computer-score').text(computerScore);
        }

        function decideWinner(playerChoice, computerChoice) {
            var resultClass;
            if (playerChoice === computerChoice) {
                winner = tieText;
                resultClass = "tie";

            } else if (playerChoice === "rock") {
                switch (computerChoice) {
                    case "scissors":
                        winner = playerWinsText;
                        playerScore++;
                        resultClass = "win";
                    break;
                    case "paper":
                        winner = computerWinsText;
                        computerScore++;
                        resultClass = "lose";
                    break;
                }
            } else if (playerChoice === "paper") {
                switch (computerChoice) {
                    case "rock":
                        winner = playerWinsText;
                        playerScore++;
                        resultClass = "win";
                    break;
                    case "scissors":
                        winner = computerWinsText;
                        computerScore++;
                        resultClass = "lose";
                    break;
                }
            } else {
                switch (computerChoice) {
                    case "rock":
                        winner = computerWinsText;
                        computerScore++;
                        resultClass = "lose";
                    break;
                    case "paper":
                        winner = playerWinsText;
                        playerScore++;
                        resultClass = "win";
                    break;
                }
            }
            $('.result').attr('class', 'result ' + resultClass);
            return winner;
        }

        function resetGame () {
            playerChoice = "";
            computerChoice = "";
            winner = "";
            round = 1;
            playerScore = 0;
            computerScore = 0;
            setValues();
            $('body').removeClass('end-game weapon-chosen');
            $('.play-again').show();
        }

        function overallWinner() {
            if (playerScore > computerScore) {
                overallResultText = overallPlayerWinText;
                overallResultClass = "win";

            } else if (playerScore < computerScore) {
                overallResultText = overallComputerWinText;
                overallResultClass = "lose";

            } else {
                overallResultText = overallTieText;
                overallResultClass = "tie";
            }
            $('.end-result').html(overallResultText);
            $('.end-screen').attr('class', 'end-screen ' + overallResultClass);
        }

        function endGame() {
            $('body').addClass('end-game');
            $('.play-again').hide();
            overallWinner();
        }

        function setBestOf(selectedRounds) {
            var endScreenRounds;
            bestOf = selectedRounds.data('rounds');
            $('.best-of').text(bestOf);
            endScreenRounds = ".rounds-" + bestOf;
            $(endScreenRounds).addClass('active').siblings().removeClass('active');
        }

        $('.start').on('click', function(e) {
            e.preventDefault();
            nextScreen($(this));
        });

        $('.choose-rounds li').on('click', function(e) {
            e.preventDefault();
            setBestOf($(this));
            nextScreen($(this));
        });

        $('.choose-character li').on('click', function(e) {
            e.preventDefault();
            setCharacter($(this), '.player-character');
            nextScreen($(this));
        });

        $('.choose-rival li').on('click', function(e) {
            e.preventDefault();
            setCharacter($(this), '.computer-character');
            $('body').addClass('game-started');
        });

        $('.weapon li').on('click', function(e) {
            e.preventDefault();
            playerChoice = $(this).data('weapon');
            $('body').addClass('weapon-chosen');
            playGame(playerChoice);
            if (round > bestOf) {
                endGame();
            }
        });

        $('.play-again').on('click', function(e) {
            e.preventDefault();
            $('body').removeClass('weapon-chosen');
            $('.round').text(round);
        });

        $('.reset').on('click', function(e) {
            e.preventDefault()
            resetGame();
        });

        $('.rounds-end-screen li').on('click', function(e) {
            e.preventDefault();
            setBestOf($(this));
        });
    });
}());