import { useState } from "react"
import './Game.css'

const instructions = 'The object of the game is to get all 5 dice to match in 3 rolls or fewer. After each roll, you can "lock" a number, to keep it in place.'

function Game() {
    return (
        <>
            <p>{instructions}</p>
            <GameBoard />
        </>
    )
}

function GameBoard() {
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
        <div>        
            <div>
                {!completed && <button className="roll-button" onClick={roll}>Roll Dice</button>}
                <span>{rollsRemaining} rolls left</span>
            </div>

            <div className="dice-wrapper">
                {dice.map((item, index) => 
                    <Dice 
                        key={index} 
                        value={item.value} 
                        index={index} 
                        locked={item.locked} 
                        setLocked={() => lockDice(index)}
                        rollsRemaining={rollsRemaining}/>
                )}
            </div>

            {completed && 
                <div>
                    {winner && <span>Congratulations! You have won!</span>}
                    {!winner && <span>Better luck next time!</span>}
                    <br/>
                    <button onClick={restartGame}>New Game</button>
                </div>
            }

        </div>

    )
}

function Dice({value, index, locked, setLocked, rollsRemaining}) {

    return (
        <div className="dice">
            <img className={locked ? 'locked' : ''} src={"/ezra_schwartz_dice_game/dice" + value + ".png"} alt={value} width="40" height="40"/>
            <br/>
            {rollsRemaining < 3 && rollsRemaining > 0 && <button onClick={() => setLocked(index)}>{locked ? 'Unlock' : 'Lock'}</button>}
        </div>
    )
}

export default Game