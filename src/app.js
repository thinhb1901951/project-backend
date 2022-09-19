const express = require('express');
const cors = require('cors');
const contactController = require('./controllers/contact.controller');
const { clearScreenDown } = require('readline');
const ApiError = require('./api-error');


const app = express();

app.use(cors());
app.use(express.json());


//Handling 404 response
app.use((req, res, next) => {
    //handler for unknown route
    //      call next() to pass to the error handling middleware
    return next(new ApiError(404, 'Resources not found'))
})

//define error handling middleware last, after app.use() and routes calls
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal server error"
    });
})


app.get('/', (req, res) => {
    res.json({ message: 'Welcome to contact book application!' });
});

app.route('/api/contacts')
    .get(contactController.findAll)
    .post(contactController.create)
    .delete(contactController.deleteAll);


app.route('/api/contacts/favorite').get(contactController.findAllFavorite);


app.route('/api/contacts/:id')
    .get(contactController.findOne)
    .put(contactController.update)
    .delete(contactController.delete);





module.exports = app;
