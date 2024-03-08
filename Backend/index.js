const cors = require('cors');

const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json());

app.use(cors());

const questionRoutes = require("./Routes/Question");
const inscriptionRoutes = require("./Routes/Inscription")
const connexionRoutes = require("./Routes/Connexion")
app.use(questionRoutes);
app.use(inscriptionRoutes);
app.use(connexionRoutes);


mongoose.connect('mongodb+srv://HerbillonMia:68Nr575aB7iSJnxd@herbillonmia.vsxvity.mongodb.net/OuiNon')

app.listen(5001, () => {
    console.log("Server has started");
});
