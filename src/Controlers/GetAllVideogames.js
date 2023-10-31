const { Videogame, genre, platform, User } = require('../db');
const { Op } = require('sequelize');

const isNumeric = (value) => {
    return typeof value === "number" && !isNaN(value);
};

const GetAllVideogames = async () => {
    const games = await Videogame.findAll({
        include: [
            { model: genre },
            { model: platform },
            { model: User }
        ]
    });

    const gamesParsed = games.map(vg => {
        const reviews = vg.Users.filter(user => user.VG_user.review !== '').map(user => {
            return {
                id: user.id,
                nickName: user.nickname,
                created: user.VG_user.createdAt.toISOString().slice(0, 10),
                lastUpdate: user.VG_user.updatedAt.toISOString().slice(0, 10),
                review: user.VG_user.review
            };
        });

        const graphics = vg.Users.filter(user => isNumeric(user.VG_user.graphics)).map(user => user.VG_user.graphics);
        const gameplay = vg.Users.filter(user => isNumeric(user.VG_user.gameplay)).map(user => user.VG_user.gameplay);
        const quality_price = vg.Users.filter(user => isNumeric(user.VG_user.quality_price)).map(user => user.VG_user.quality_price);

        return {
            id: vg.id,
            name: vg.name,
            description: vg.description,
            image: vg.image,
            price: vg.price,
            released: vg.released,
            genres: vg.genres.map(g => g.name),
            platforms: vg.platforms.map(p => p.name),
            reviews,
            graphics,
            gameplay,
            quality_price
        };
    });

    return gamesParsed;
};

module.exports = GetAllVideogames;
