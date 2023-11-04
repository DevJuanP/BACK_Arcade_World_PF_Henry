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
    const reviews = gamebyId.Users.filter(user => user.VG_user.review !== null ).map(user => {
        return {
            userId: user.id,
            nickName: user.nickname,
            lastUpdate: user.VG_user.review.editedAt.toISOString().slice(0, 10),
            review: user.VG_user.review.value
        };
    });

    const graphics = gamebyId.Users.filter(user => isNumeric(user.VG_user.graphics)).map(user => user.VG_user.graphics);
    const gameplay = gamebyId.Users.filter(user => isNumeric(user.VG_user.gameplay)).map(user => user.VG_user.gameplay);
    const quality_price = gamebyId.Users.filter(user => isNumeric(user.VG_user.quality_price)).map(user => user.VG_user.quality_price);

    return {
        id: gamebyId.id,
        name: gamebyId.name,
        description: gamebyId.description,
        image: gamebyId.image,
        price: gamebyId.price,
        released: gamebyId.released,
        createdAt: gamebyId.createdAt.toISOString().slice(0, 10),
        updatedAt: gamebyId.updatedAt.toISOString().slice(0, 10),
        genres: gamebyId.genres.map(g => g.name),
        platforms: gamebyId.platforms.map(p => p.name),
        reviews,
        graphics,
        gameplay,
        quality_price
    };
}

module.exports = getGameById