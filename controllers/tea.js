const Tea = require('../models/Tea')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploadImg = multer({ storage: storage }).single('image');


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
                image: req.file.path,
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

//POST 1 tea comment'
const newComment = (req, res) => {
    let name = req.params.name; // get the tea to add the comment in
    let newComment = req.body.comment; // get the new comment
    //create a comment object to push
    const comment = {
        text: newComment,
        date: new Date()
    }
    //find the tea object
    Tea.findOne({ name: name }, (err, data) => {
        if (err || !data || !newComment) {
            return res.json({ message: "Tea doesn't exist" });    
        }
        else {
            //add comment to comments array of the tea object
            data.comments.push(comment);
            //save changes to db
            data.save(err => {
                if (err) {
                    return res.json({message:"Comment failed to add", error:err })
                }
                return res.json(data)
            })
        }
    })
};

//DELETE '/tea/:name'
const deleteOneTea = (req, res, next) => {
    let name = req.params.name; // get the tea name of tea to delete

    Tea.deleteOne({ name: name }, (err, data) => {
    //if theres nothing to delete return a message
        if (data.deletedCount == 0) return res.json({ message: "Tea doesn't exist" });
        //else if there's an error, return the err message
        else if (err) return res.json(`Something went wrong, please try again. ${err}`)
        //else return the success mesage
        else return res.json({ message: "Tea deleted" });
    })
};
module.exports = {
    getAllTea,
    uploadImg,
    newTea,
    deleteAllTea,
    getOneTea,
    newComment,
    deleteOneTea,
};
é
