require('dotenv').config();
const app = require('./src/app');

//start here
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}.`);

}); 