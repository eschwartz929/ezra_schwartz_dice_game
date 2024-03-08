import { useEffect, useState } from "react"
import './Game.css'

function Game() {
    const defaultGame = [
        {value: 1, locked: false}, 
        {value: 2, locked: false}, 
        {value: 3, locked: false}, 
        {value: 4, locked: false}, 
        {value: 5, locked: false}
    ]
    const [dice, setDice] = useState(defaultGame)
    const [rollsRemaining, setRollsRemaining] = useState(3)
    const [winner, setWinner] = useState(false)
    const [completed, setCompleted] = useState(false)

    function roll() {
        var arr = [...dice]
        for (var i = 0; i < arr.length; i++) {
            if (!arr[i].locked) {
                arr[i].value = Math.floor(Math.random() * 6) + 1
            }
        }
        setDice(arr)
        setRollsRemaining(rollsRemaining - 1)
        checkIfWinner()
    }

    function checkIfWinner() {
        var val = dice[0].value

        for (var i = 1; i < dice.length; i++) {
            if (dice[i].value !== val) {
                if (rollsRemaining - 1 === 0) {
                    setCompleted(true)
                }
                return
            }
        }

        setWinner(true)
        setCompleted(true)
    }

    function lockDice(index) {
        var arr = [...dice]
        arr[index].locked = !arr[index].locked
        setDice(arr)
    }

    function restartGame() {
        setCompleted(false)
        setDice(defaultGame)
        setRollsRemaining(3)
    }

    return (
        <>
            <h3>Game</h3>
            

            <div className="dice-wrapper">
                {dice.map((item, index) => 
                    <Dice key={index} value={item.value} index={index} locked={item.locked} setLocked={() => lockDice(index)}/>
                )}
            </div>

            {!completed && <button onClick={roll}>Roll Dice</button>}
            {completed && <button onClick={restartGame}>New Game</button>
            }
            <h4>{rollsRemaining} rolls left</h4>

            {winner && <span>Winner!</span>}
            {!winner && completed && <span>Try Again</span>}
        </>

    )
}

function Dice({value, index, locked, setLocked}) {

    return (
        <div className="dice">
            <img src={"dice" + value + ".png"} alt={value} width="40" height="40"/>
            <br/>
            <button onClick={() => setLocked(index)}>{locked ? 'Unlock' : 'Lock'}</button>
        </div>
    )
}

export default Game