$(document).ready(function(){

  var game = {
  
  questions: [
      {
          question: "Who let the dogs out?",
          answerChoices: [ 'a', 'b', 'c'],
          id: 'question-one',
          answer: 1
      },
      {
          question: "If the plural of goose is geese, why is the plural of moose not meese?",
          answerChoices: [ 'a', 'b', 'c'],
          id: 'question-two',
          answer: 0
      },
      {
          question: "Who let the dogs out?",
          answerChoices: [ 'you', 'me', 'dogs let themselves out'],
          id: 'question-three',
          answer: 1
      },
      {
          question: "Who let the dogs out?",
          answerChoices: [ 'you', 'me', 'dogs let themselves out'],
          id: 'question-four',
          answer: 1
      }
    ]
  }
  
          var message = "Game Over";
  
          // this initializes the button that starts the game
          $(".startGame").on("click", function() {
              // when the start button is clicked, the div with the questions that was hidden is shown
              $('.wrapper').show();
              console.log('hello');
  
              $(this).hide();
          });
  
          // these events start the timer :set the number of seconds the guesser has
          var number = 30;
          // $('#timeLeft').on('click', run);
  
  
          // This function enables the number of seconds to decrease with time, and to display 
          // the result of that decrease until time is up 
          function decrement(){
              // Decrease number by one
              number --;
              // show the number in the #timeLeft div. 
              $('#timeLeft').html(`<h2>  ${number} seconds </h2>`);
  
              // when the number is equal to zero
              if(number === 0){
                  // run the stop funciton
                  stop();
                  // Update the innerHTML of the message why class instead of id?
                  $('.message').html('time up!');
                  checkAnswers();
              }
          }
  
          // the run function sets the spacing of the decrement function's time interval so that
          // it can be equal to a second per number decrement.
          // every second counter will run the fx decrement every second
          // have to have it contained in a variable
          function run (){
  
              counter = setInterval(decrement, 1000);
          }
  
          function stop(){
  
              clearInterval(counter)
          }
  // why?
          run();
  
          // this fx dynamically creates the inputs needed for the form and relates them to the 
          // items held within the game object.
  // dynamically creating the HTML for every
          function formTemplate(data){
  // cant use double quotes 
              var qString = "<form id='questionOne'>" + data.question + "<br>";
  
              // data.answerChoices is an array
              var answerChoices = data.answerChoices;
  
              for (var i = 0; i < answerChoices.length; i++){
                  var answerChoice = answerChoices[i];
                  console.log(answerChoice);
                  qString = qString + "<input type='radio' name="+data.id+" value="+i+">"+answerChoice;
              }
              return qString +"</form>";
              console.log(qString)
          }
  // why?
// The window object is supported by all browsers. It represents the browser's window.
// All global JavaScript objects, functions, and variables automatically become members of the window object.


          window.formTemplate = formTemplate

          // this function takes the template created in the last function and by appending it,
          //  allows it to be displayed on the page
          // loop thru the questions array (all objs)

          function renderQuestions(){
            var questionHTML = '';
            for(var i = 0; i < game.questions.length; i++){
            questionHTML = questionHTML + formTemplate(game.questions[i]);
          }
        
        $('questions-container').append(questionHTML);
        }
  
  
        // .is (object method) Description: Check the current matched set of elements against a selector,
        //  element, or jQuery object and return true if at least one of these elements matches the given arguments.

        // .eq Description: Check the current matched set of elements against a selector, element, or jQuery object and 
        // return true if at least one of these elements matches the given arguments.
        function isCorrect(question){
          var answers = $('[name='+question.id+']');
          // $("[name=question-eleven"]")
          var correct = answers.eq(question.answer);
          var isChecked = correct.is(':checked');
          return isChecked;
        }

        renderQuestions();

        // function to build the display of guesser results

        function resultsTemplate(question){
          var htmlBlock = '<div>';
          htmlBlock = htmlBlock + question.question + ': ' + isChecked;
          return htmlBlock + "</div>";
        }

        // function to tabulate the guesser results

        function checkAnswers(){
          // variables needed to hold results
          var resultsHTML = '';
          var guessedAnswers = [];
          var correct = 0;
          var incorrect = 0;
          var unAnswered = 0;

          // for loop iterates through each question and passes teh questions at each index first into
          //  the isCorrect function to see if they match the indicies of correct answers, and if they do, 
          // increments up the correct score 

          for (var i = 0; i < game.questions.length; i++){
            if(isCorrect(game.questions[i])){
              correct ++;
            } else {

             if(checkAnswered(game.questions[i])){
               incorrect ++;
             } else {
               unAnswered ++;
             }
            }
          }
          // display the results of the functio in the results div and use string of text to realte teh 
          // results of the for loop with their corresponding values
          $(".results").html("correct: "+correct+ "<br>" +"incorrect: "+incorrect+ "<br>" +"unanswered: "+unAnswered); 

        }

        // this function checks whether the guesser actually checked an answer for each of the questions

        function checkAnswered(question){
          var anyAnswered = false;
          var answers = $("[name="+question.id+"]");

          // the for loop creates a condition to check if the buttons were checked and then sets 
          // the anyAnswered variable to true if they were

          for(var i = 0; i< answers.length; i++){
            if (answers[i].checked){
              anyAnswered = true;
            }
          }

          // then return the anyAnswered variable so it can be tabulated in the last function to distingish 
          // between incorrect answers and those answers that were not attempted 
          // var $elem - when an obj

          return anyAnswered;
        }
        // on click event that checks the answers and stops the clock when done
          $("#doneButton").on("click", function(){
            checkAnswers();
            stop();
            $("#messageDiv").html("Game Over");
          });

      });
      
          
          
      
  
  
  
  
  
  
  
  
  
  
  
  