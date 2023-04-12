const collection = require('../models/store.model');

module.exports.findAll = (req, res) => {
    collection.find().sort({ Num: 1 })
        .then(all => res.json(all))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.findOneSingle = (req, res) => {
    collection.findOne({ _id: req.params.id })
        .then(oneSingle => res.json(oneSingle))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}

module.exports.createNew = (req, res) => {
    req.body ? collection.create(req.body)
        .then(newlyCreated => res.json(newlyCreated))
        .catch(err => res.status(400).json({ message: 'Something went wrong', error: err })) : res.json(Object.keys(req));
}

module.exports.updateExisting = (req, res) => {
    collection.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updated => res.json(updated))
        .catch(err => res.status(400).json({ message: 'Something went wrong', error: err }));
}

module.exports.deleteAnExisting = (req, res) => {
    collection.deleteOne({ _id: req.params.id })
        .then(result => res.json({ result: result }))
        .catch(err => res.json({ message: 'Something went wrong', error: err }));
}