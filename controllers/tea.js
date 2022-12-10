//Get '/tea'
const getAllTea = (req, res, next) => {
    res.json({ message: "Get all tea" });
};

const newTea = (req, res, next) => {
    res.json({message:"POST new tea"}) //Função básica
}

//DELETE '/tea'
const deleteAllTea = (req, res, next) => {
    res.json({ message: "DELETE all tea" });
};

//GET '/tea/:name'
const getOneTea = (req, res, next) => {
    res.json({ message: "GET 1 tea" });
};

//POST '/tea/:name'
const newComment = (req, res, next) => {
    res.json({ message: "POST 1 tea comment" });
};

//DELETE '/tea/:name'
const deleteOneTea = (req, res, next) => {
    res.json({ message: "DELETE 1 tea" });
};
module.exports = {
    getAllTea,
    newTea,
    deleteAllTea,
    getOneTea,
    newComment,
    deleteOneTea,
};
