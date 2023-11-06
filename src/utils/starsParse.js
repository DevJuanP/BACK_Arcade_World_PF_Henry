const starsParse = (arr) => {
    const parse = Array(5)
    const five = arr.filter( s => s === 5).length
    const four = arr.filter( s => s === 4).length
    const three = arr.filter( s => s === 3).length
    const two = arr.filter( s => s === 2).length
    const one = arr.filter( s => s === 1).length

    parse[0] = Number((five/arr.length).toFixed(2))
    parse[1] = Number((four/arr.length).toFixed(2))
    parse[2] = Number((three/arr.length).toFixed(2))
    parse[3] = Number((two/arr.length).toFixed(2))
    parse[4] = Number((one/arr.length).toFixed(2))

    return parse
}

const arr = [2, 3, 5, 4, 3, 2, 5, 1, 5, 3, 4, 2, 1, 5, 3, 2, 3, 2]

//console.log(starsParse(arr));

module.exports = starsParse