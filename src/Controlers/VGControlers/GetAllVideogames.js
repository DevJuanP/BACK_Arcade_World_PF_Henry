const { Videogame, genre, platform, User } = require('../../db');
const { Op } = require('sequelize');
const starsParse = require('../../utils/starsParse')

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
        const reviews = vg.Users.filter(user => user.VG_user.review !== null ).map(user => {
            return {
                userId: user.id,
                nickName: user.nickname,
                lastUpdate: user.VG_user.review.editedAt.toISOString().slice(0, 10),
                review: user.VG_user.review.value
            };
        });

        let graphics = vg.Users.filter(user => isNumeric(user.VG_user.graphics)).map(user => user.VG_user.graphics);
        graphics = {
            stars: starsParse(graphics),
            score: graphics.reduce((total, star) => total + star, 0)/(graphics.length)
        }

        let gameplay = vg.Users.filter(user => isNumeric(user.VG_user.gameplay)).map(user => user.VG_user.gameplay);
        gameplay = {
            stars: starsParse(gameplay),
            score: gameplay.reduce((total, star) => total + star, 0)/(gameplay.length)
        }

        let quality_price = vg.Users.filter(user => isNumeric(user.VG_user.quality_price)).map(user => user.VG_user.quality_price);
        quality_price = {
            stars: starsParse(quality_price),
            score: quality_price.reduce((total, star) => total + star, 0)/(quality_price.length)
        }


        return {
            id: vg.id,
            name: vg.name,
            description: vg.description,
            image: vg.image,
            price: vg.price,
            released: vg.released,
            isActive: vg.isActive,
            createdAt: vg.createdAt.toISOString().slice(0, 10),
            updatedAt: vg.updatedAt.toISOString().slice(0, 10),
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
