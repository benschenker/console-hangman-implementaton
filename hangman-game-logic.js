(function() {
                'use strict'
                /////////////////////////////////////////////////
                // Variable declaration
                /////////////////////////////////////////////////
                var phrase, setPhrase, guess, charactersGuessed, displayCurrent
                    ;

                /////////////////////////////////////////////////
                // Variable initialization
                /////////////////////////////////////////////////
                setPhrase = function(text) {
                    if(phrase){
                        return "Oh no, you already set the phrase!";
                    } else {
                        phrase = text.toUpperCase();
                        return "Congrats, you set the phrase!";
                    }
                };

                charactersGuessed = [];
                guess = function(character) {
                    if(character) {
                        charactersGuessed.push(character.toUpperCase());
                    }
                    return displayCurrent();
                }

                displayCurrent = function() {
                    var displayedPhrase, unknownLettersRemaining, numIncorrect;
                    /////////////////////////////////////////////////
                    unknownLettersRemaining = 0;
                    numIncorrect = 0;

                    displayedPhrase = window.hangman.forEachLetter(phrase, function(character) {
                        if(character === " ") {
                            return character;
                        } else if (window.hangman.contains(charactersGuessed, character)) {
                            return character;
                        } else {
                            unknownLettersRemaining = unknownLettersRemaining + 1;
                            return "-";
                        }
                    });
                    window.hangman.forEachLetter(
                        charactersGuessed.join(''), function(character) {
                            if (phrase.indexOf(character)===-1) {
                                numIncorrect++;
                            }
                    });
                    /////////////////////////////////////////////////
                    console.log("Currently:", displayedPhrase);
                    console.log("So far you've guessed ", charactersGuessed);

                    if(unknownLettersRemaining === 0) {
                        console.log("You win!");
                        window.hangman.cornifyTimes(4);
                    }
                    return {
                        secretState: displayedPhrase,
                        numIncorrect: numIncorrect
                    }
                }

                /////////////////////////////////////////////////
                // Do Stuff
                /////////////////////////////////////////////////
                console.log("Welcome to hangman! There is a secret phrase");
                console.log("Commands you can use: guess('a')");

                // displayCurrent();

                /////////////////////////////////////////////////
                // Export variables
                /////////////////////////////////////////////////
                window.guess = guess;
                window.displayCurrent = displayCurrent;
                window.setPhrase = setPhrase;
            })();