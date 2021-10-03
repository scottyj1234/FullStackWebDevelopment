import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({clickHandler, text}) => 
  <button onClick={clickHandler}> {text}</button>

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = (props) => {
  const all = props.good + props.neutral + props.bad
  const average = (props.good - props.bad) / all
  const goodPercent = (props.good / all * 100) + ' %'

  if (all === 0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={all} />
      <StatisticLine text='average' value={average} />
      <StatisticLine text='positive' value={goodPercent} />
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button clickHandler={() => setGood(good + 1)} text='good' />
      <Button clickHandler={() => setNeutral(neutral + 1)} text='neutral' />
      <Button clickHandler={() => setBad(bad + 1)} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App;
