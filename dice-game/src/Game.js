import { useState } from "react"

function Game() {
    const [active, setActive] = useState(false)
    const [dice, setDice] = useState([{value: 1}, {value: 1}, {value: 1}, {value: 1}, {value: 1}])
    const [turn, setTurn] = useState(1)

    function roll() {
        var arr = [...dice]
        for (var i = 0; i < arr.length; i++) {
            arr[i].value = Math.floor(Math.random() * 6) + 1
        }
        setDice(arr)
    }

    return (
        <>
            <h3>Game</h3>

            <div>
                {dice.map((item, index) => 
                    <Die key={index} value={item.value}/>
                )}
            </div>

            <button onClick={roll}>Roll Dice</button>
        </>

    )
}

function Die({value}) {
    const [locked, setLocked] = useState(false)

    return (
        <>
            <span>{value}</span>
        </>
    )
}

export default Game