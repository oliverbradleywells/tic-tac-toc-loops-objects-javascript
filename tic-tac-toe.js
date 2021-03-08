const state = [
    null, null, null,
    null, null, null,
    null, null, null
]

let player = true // false

function checkLine(n, jumpOver) {
    if (state[n] === null) return false
    return state[n] === state[n + jumpOver] && state[n] === state[n + jumpOver * 2]
}

function checkX() {
    return checkLine(0, 3) || checkLine(1, 3) || checkLine(2, 3)
}

function checkY() {
    return checkLine(0, 1) || checkLine(3, 1) || checkLine(6, 1)
}

function checkZ() {
    if (state[0] !== null) {
        return state[0] === state[4] && state[0] === state[8]
    }

    if (state[2] !== null) {
        return state[2] === state[4] && state[2] === state[6]
    }

    return false
}

function resetState() {
    document.querySelector('#current-player').textContent =
        `on move: player 1`
    player = true
    for (let i = 0; i < 9; i++) {
        state[i] = null
        const square = document.querySelector('#cell-' + i)
        square.textContent = ''
    }
}

function move(i) {
    if (state[i] !== null) return
    state[i] = player ? 'X' : 'O'
    document.querySelector('#cell-' + i).textContent = state[i]

    console.log(state)
    if (checkX() || checkY() || checkZ()) {
        alert(`Congratulations! Player ${player ? 1 : 2} won!`)
        setTimeout(resetState, 3000)
        return
    }
    player = !player
    document.querySelector('#current-player').textContent =
        `on move: player ${player ? 1 : 2}`
}

for (let i = 0; i < 9; i++) {
    const square = document.querySelector('#cell-' + i)
    square.addEventListener('click', () => {
        move(i)
        // console.log(state)
    })
}
