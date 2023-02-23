import { useState } from 'react'

const Statistics = (props) => {
  if (props.total === 0){
    return( <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
      <StatisticLine text ='good' value = {props.good}/>
      <StatisticLine text ='neutral' value = {props.neutral}/>
      <StatisticLine text ='bad' value = {props.bad}/>
      <StatisticLine text ='total' value = {props.total}/>
      <StatisticLine text ='average' value = {props.average}/>
      <StatisticLine text ='positive' value = {props.positive}/>
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) => {
  return (
    <>
    <button onClick={props.good}>good</button>
    <button onClick={props.neutral}>neutral</button>
    <button onClick={props.bad}>bad</button>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;
  const average = (good - bad)/ total;
  const positive = (good/total)*100 + ' %';

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button good={addGood} neutral={addNeutral} bad={addBad}/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div>
  )
}

export default App