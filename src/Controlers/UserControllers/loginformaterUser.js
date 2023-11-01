const  { User, genre, platform } = require('../../db')
const isNumeric = require('../../utils/isNumeric')


const loginformaterUser = (user) => {
    const purchased = user.Videogames.filter( vg => vg.VG_user.purchased).map( vg => { return {
        id: vg.id,
        name: vg.name,
        image: vg.image,
        genres: vg.genres.map( g => g.name),
        platforms: vg.platforms.map( p => p.name)
    }})

    const favorites = user.Videogames.filter( vg => vg.VG_user.favorites).map( vg => { return {
        id: vg.id,
        name: vg.name,
        image: vg.image,
        price: vg.price,
        genres: vg.genres.map( g => g.name),
        platforms: vg.platforms.map( p => p.name)
    }})

    const reviews = user.Videogames.filter( vg => vg.VG_user.review !== '').map( vg => { return {
        id: vg.id,
        review: vg.VG_user.review
    }})

    const graphics = user.Videogames.filter( vg => isNumeric(vg.VG_user.graphics)).map( vg => { return{
        id: vg.id,
        stars: vg.VG_user.graphics
    }})

    const gameplay = user.Videogames.filter( vg => isNumeric(vg.VG_user.gameplay)).map( vg => { return{
        id: vg.id,
        stars: vg.VG_user.gameplay
    }})

    const quality_price = user.Videogames.filter( vg => isNumeric(vg.VG_user.quality_price)).map( vg => { return{
        id: vg.id,
        stars: vg.VG_user.quality_price
    }})

    const userParse = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        nickname: user.nickname,
        Email: user.Email,
        image: user.image,
        purchased,
        favorites,
        reviews,
        graphics,
        gameplay,
        quality_price
    }

    return userParse
}

module.exports = loginformaterUser