const isNumeric = require('../../utils/isNumeric')

const loginformaterUser = (user) => {
    const purchased = user.Purchases.map( pur => { return {
        purchaseId: pur.id,
        amount: Number(pur.amount.toFixed(2)),
        paymentMethod: pur.paymentMethod,
        date: pur.createdAt.toISOString().slice(0, 10),
        Videogames: pur.Videogames.map( vg => {return {
            GameId: vg.id,
            name: vg.name,
            image: vg.image
        }})
    }})

    const favorites = user.Videogames.filter( vg => vg.VG_user.favorites).map( vg => { return {
        id: vg.id,
        name: vg.name,
        image: vg.image,
        //price: vg.price,//no
        //genres: vg.genres.map( g => g.name),//no 
        //platforms: vg.platforms.map( p => p.name)//no
    }})

    const reviews = user.Videogames.filter( vg => vg.VG_user.review !== null).map( vg => { return {
        id: vg.id,
        review: vg.VG_user.review//.toISOString().slice(0, 10)
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
    //const quality_priceArr = user.Videogames.filter( vg => isNumeric(vg.VG_user.quality_price)).map( vg => vg.VG_user.quality_price)
    //const quality_price = starsParse(quality_priceArr) 

    const userParsed = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        nickname: user.nickname,
        Email: user.Email,
        photo: user.image,
        logincount: user.logincount,
        admin: user.admin,
        banstatus: user.banstatus,
        createdAt: user.createdAt,
        purchased,
        favorites,//array de ideas
        reviews,//a mi gu
        graphics,
        gameplay,
        quality_price
    }

    return userParsed

}

module.exports = loginformaterUser