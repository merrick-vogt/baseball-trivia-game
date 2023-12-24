import { useState, useEffect } from 'react';
import './App.css';
import background from "./assets/baseballbackground.jpg";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ScoreTable from './ScoreTable';
import { Box } from '@mui/material';
import baseballTrivia from './baseballTrivia';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState({});
  
  const [incorrectAnswers, setIncorrectAnswers] = useState(0);
  const [inning, setInning] = useState(1);
  const [teamAScores, setTeamAScores] = useState([0, 0, 0]);
  const [teamBScores, setTeamBScores] = useState([0, 0, 0]);

  // Function to select a random question
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * baseballTrivia.questions.length);
    return baseballTrivia.questions[randomIndex];
  };

  // Set a random question when the component mounts or when a button is clicked
  useEffect(() => {
    setCurrentQuestion(getRandomQuestion());
  }, []);

  // Handle button click to check answer and get a new question
  const handleButtonClick = (optionIndex) => {
    if (optionIndex === currentQuestion.answerIndex) {
      // Update the score based on the current inning
      const updatedScores = [...teamAScores];
      updatedScores[inning - 1] += 1; // inning - 1 because array index is zero-based
      setTeamAScores(updatedScores);
    } else {
      setIncorrectAnswers(incorrectAnswers + 1);
    }

    // Check if incorrect answers have reached 3
    if (incorrectAnswers + 1 === 3) {
      // Calculate random score for Team B
      const randomScore = Math.floor(Math.random() * 5) + 1;
      const updatedBScores = [...teamBScores];
      updatedBScores[inning - 1] += randomScore;
      setTeamBScores(updatedBScores);

      // Move to next inning and reset incorrect answers
      setInning(inning + 1);
      setIncorrectAnswers(0);
    } else {
      setCurrentQuestion(getRandomQuestion());
    }
  };



  return (
    <>
      <div className="background-container">
        {/* <div className="background-image" style={{ backgroundImage: `url(${background})` }}></div> */}
        <div className="content-container">
          <div className='question-container'>
            <Box bgcolor="secondary.main" color="secondary.contrastText">
              <h1>{currentQuestion.question}</h1>
            </Box>
          </div>  
          <div className="button-group-container">
            <ButtonGroup size="large" orientation="vertical" aria-label="contained primary button group" variant="contained">
              {currentQuestion.options && currentQuestion.options.map((option, index) => (
                <Button key={index} onClick={() => handleButtonClick(index)}>{option}</Button>
              ))}
            </ButtonGroup>
          </div>
          <div className="score-table-container">
            <ScoreTable teamAScores={teamAScores} teamBScores={teamBScores}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default App;
