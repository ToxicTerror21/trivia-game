import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Start from "./components/StartScreen"
import Questions from "./components/Questions"
import React from "React"
function App() {
  const [count, setCount] = useState(0)
  const [isShown, SetShow] = React.useState(true)
  const [apidata, SetData] = React.useState([])
  const [checkanswers,SetAnswers] = React.useState(false);
  const[refresh,SetRefresh] =React.useState(false);
  let correcttracker = 0;
  let keyx = 0;
  function toggle(){
    console.log("mandem");
    SetShow(prevState => !prevState)
  }

  React.useEffect(() => {
        async function getQuestions() {
            const res = await fetch("https://opentdb.com/api.php?amount=5")
            const data = await res.json()
            console.log(data.results);
            SetData(data.results);
          
            console.log("ATTENTION IT IS" +data.results)
            
        }
        getQuestions()
    }, [refresh])
  

    function correctlyselected(){
      if(checkanswers==false){
       
        correcttracker++;
        console.log(correcttracker);
      }
      
    }

    function done(){
      if(checkanswers==false){
        SetAnswers(prevState=>!prevState);
      }
    
    }

    function playagain(){
      SetAnswers(prevState=>false);
      SetRefresh(prevState => !prevState);
     
      
    }

    
    const questionsdata = apidata.map(travel=>{
      console.log(travel.correct_answer);

      let questionsx = [travel.incorrect_answers[0],travel.incorrect_answers[1],travel.incorrect_answers[2],travel.correct_answer]

      for(let x =0; x<4; x++){
        let rando =[Math.floor(Math.random() * 4)]
        if(rando==x){
            rando =[Math.floor(Math.random() * 4)]
        }
        let first = questionsx[x];
        let picked = questionsx[rando];
        questionsx[rando] = first;
        questionsx[x] = picked;
    }


      return(
        <Questions
        key = {keyx++}
        id = {keyx}
        handleClick ={correctlyselected}
        mainquestion = {travel.question}
        correctanswer = {travel.correct_answer}
        questions = {questionsx}
        handin={checkanswers}
        newgame={refresh}
      />
      )
      
    
     })
 
  return (
    <div className="App">
       {isShown &&<Start handleClick ={toggle}/>}
         {!isShown&& questionsdata}

      <div className='ba'>
       {!checkanswers&& <button type='submit' onClick={done} className="checkall"> Check Answers</button>} 
      </div>

      <div className='results'>
       {checkanswers && <h2>You Scored 3/5 answers correct!</h2>} 
        {checkanswers && <button type="submit" className="checkall" onClick={playagain}>Play Again?</button>}
      </div>
    </div>
  )
}

export default App
