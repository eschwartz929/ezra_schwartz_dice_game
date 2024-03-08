import { useEffect, useState } from "react"

function Game() {
    const [dice, setDice] = useState([{value: 1, locked: false}, {value: 1, locked: false}, {value: 1, locked: false}, {value: 1, locked: false}, {value: 1, locked: false}])
    const [turn, setTurn] = useState(0)
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
        setTurn(turn+1)
        checkIfWinner()
    }

    function checkIfWinner() {
        var val = dice[0].value

        for (var i = 1; i < dice.length; i++) {
            if (dice[i].value !== val) {
                if (turn === 3) {
                    setCompleted(true)
                }
                return
            }
        }

        setWinner(true)
        setCompleted(true)
    }

    function lockDie(index) {
        var arr = [...dice]
        arr[index].locked = !arr[index].locked
        setDice(arr)
    }

    function restartGame() {
        setCompleted(false)
        setTurn(1)
        roll()
    }

    return (
        <>
            <h3>Game</h3>
            <h4>Turn: {turn}</h4>

            <div>
                {dice.map((item, index) => 
                    <Die key={index} value={item.value} index={index} locked={item.locked} setLocked={() => lockDie(index)}/>
                )}
            </div>

            {!completed && <button onClick={roll}>Roll Dice</button>}
            {winner && <span>Congrats! You have Won!</span>}
            {!winner && turn === 3 && <span>Not this time</span>}
            {completed && <button onClick={restartGame}>New Game</button>}
        </>

    )
}

function Die({value, index, locked, setLocked}) {

    return (
        <>
            <span>{value}</span>
            <button onClick={() => setLocked(index)}>{locked ? 'Unlock' : 'Lock'}</button>
        </>
    )
}

export default Game