const {platform} = require("../db")
const getpltaformshandler = async (req, res) => {
    try {
        const plataformas = await platform.findAll()
        const parsed = plataformas.map(p=>p.name)
        res.status(200).json(parsed)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
module.exports = getpltaformshandler