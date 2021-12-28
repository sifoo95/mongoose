
const mongoose = require("mongoose")


const connectDB = async() => {
    try {
        await mongoose.connect('mongodb+srv://seyfeddine:ghrimils22@seyfeddine.allfq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        console.log('Connection success ...')
    } catch (error) {
        console.log('Connection fail !!!')
        
    }
}

module.exports = connectDB