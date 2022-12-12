const Tea = require('../models/Tea')
//Get '/tea'
const getAllTea = (req, res, next) => {
    Tea.find({}, (err, data) => {
        if (err) {
            return res.json({ Error: err });
        }
        return res.json(data);
    })
    
};
//POST '/tea    
const newTea = (req, res) => {
    //check if the tea name already exists in db
    Tea.findOne({ name: req.body.name }, (err, data) => {
        //if tea not in db, add it
        if (!data) {
            const newTea = new Tea({
                name: req.body.name,
                image: req.body.image, // placeholder for now
                description: req.body.description,
                origin: req.body.origin,
                brew_time: req.body.brew_time,
                temperature: req.body.temperature
            })
            // save this object to database
            newTea.save((err, data) => {
                if (err) return res.json({ Error: err });
                return res.json(data);
            })
            //if there's an error or the tea is in db, return a message
        } else {
            if (err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message: "Tea alredy exists"})
        }
    })
}

//DELETE '/tea'
const deleteAllTea = (req, res) => {
        Tea.deleteMany({}, err => {
            if (err) {
                return res.json({ message: "Complete delete failed" });
            }
            return res.json({ message: "Complete delete successful" });
         })
   };


//GET '/tea/:name'
const getOneTea = (req, res, next) => {
    let name = req.params.name; // get the tea name

    //find the specific tea with that name
    Tea.findOne({ name: name }, (err, data) => {
        if (err || !data) {
            return res.json({ message: "Tea does not exist." });
        }
        else return res.json(data); // return the tea object if found
    });
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
