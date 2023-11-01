const {Videogame, genre, platform, User } = require('../../db')
const isNumeric = require('../../utils/isNumeric')


const getGameById = async (id) => {
    const gamebyId = await Videogame.findByPk(id, {
        include: [
            {
                model: genre,
                attributes: ['name']
            },
            {
                model: platform,
                attributes: ['name']
            },
            { model: User }
        ]
    });

    // Filtra y procesa las revisiones, calificaciones de gráficos, jugabilidad y relación calidad-precio
    const reviews = gamebyId.Users.filter(user => user.VG_user.review !== '').map(user => {
        return {
            id: user.id,
            nickName: user.nickname,
            created: user.VG_user.createdAt.toISOString().slice(0, 10),
            lastUpdate: user.VG_user.updatedAt.toISOString().slice(0, 10),
            review: user.VG_user.review
        };
    });
    const graphics = gamebyId.Users.filter(user => isNumeric(user.VG_user.graphics)).map(user => user.VG_user.graphics);
    const gameplay = gamebyId.Users.filter(user => isNumeric(user.VG_user.gameplay)).map(user => user.VG_user.gameplay);
    const quality_price = gamebyId.Users.filter(user => isNumeric(user.VG_user.quality_price)).map(user => user.VG_user.quality_price);

    const gamesParsed = {
        id: gamebyId.id,
        name: gamebyId.name,
        description: gamebyId.description,
        image: gamebyId.image,
        price: gamebyId.price,
        released: gamebyId.released,
        genres: gamebyId.genres.map(g => g.name),
        platforms: gamebyId.platforms.map(p => p.name),
        reviews,
        graphics,
        gameplay,
        quality_price
    };

    return gamesParsed
}

module.exports = getGameById