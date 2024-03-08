const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Question = require('../Model/Questions');
const User = require('../Model/Users')

const authMiddleware = require('../middleware/autorization');


mongoose.connect('mongodb+srv://HerbillonMia:68Nr575aB7iSJnxd@herbillonmia.vsxvity.mongodb.net/OuiNon')

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find({});
        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching questions' });
    }
});


router.post('/questions', authMiddleware, async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({ error: 'Question text cannot be empty' });
        }

        const question = new Question({ text });
        await question.save();

        const user = req.user;

        // Ajout de la question complète à la liste des questions de l'utilisateur
        user.questions.push(question);

        // Sauvegarde de l'utilisateur avec la nouvelle question ajoutée
        await user.save();

        res.status(201).json(question);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating a question' });
    }
});

router.get('/questions', async (req, res) => {
    try {
        // Récupérer toutes les questions depuis la base de données
        const questions = await Question.find(req.body._id);

        res.status(200).json(questions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching questions' });
    }
});

router.post('/repondre', async (req, res) => {
    try {
        const { questionId, answer } = req.body;

        if (answer !== 'oui' && answer !== 'non') {
            return res.status(400).json({ error: 'Réponse invalide' });
        }

        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: 'Question non trouvée' });
        }



        // Mettre à jour le compteur de réponses pour la question
        if (answer === 'oui') {
            question.numberOfYes++;
        } else {
            question.numberOfNo++;
        }

        // Enregistrer les modifications
        await question.save();
        // await user.save();

        res.status(200).json({ message: 'Réponse enregistrée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la réponse' });
    }
});

router.delete('/questions/:id/', authMiddleware, async (req, res) => {
    try {
        const questionId = req.params.id;

        // Vérifier si la question existe
        const question = await Question.findById(questionId);
        if (!question) {
            return res.status(404).json({ error: 'Question not found' });
        }

        // Supprimer la question de la base de données de questions
        await Question.findByIdAndDelete(questionId);

        // Récupérer l'utilisateur
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Filtrer les questions de l'utilisateur pour exclure celle qui vient d'être supprimée
        user.questions = user.questions.filter(q => q._id.toString() !== questionId);

        // Enregistrer les modifications dans la base de données
        await user.save();

        // Retourner une réponse de succès
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while deleting the question' });
    }
});











// router.post('/repondre', async (req, res) => {
//     try {
//         const { questionId, answer } = req.body;

//         if (answer !== 'oui' && answer !== 'non') {
//             return res.status(400).json({ error: 'Réponse invalide' }); 
//         }

//         const question = await Question.findById(questionId);

//         if (!question) {
//             return res.status(404).json({ error: 'Question non trouvée' });
//         }
//         if (answer === 'oui') {
//             question.numberOfYes++;
//         } else {
//             question.numberOfNo++;
//         }
//         await question.save();

//         res.status(200).json({ message: 'Réponse enregistrée avec succès' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Une erreur est survenue lors de l\'enregistrement de la réponse' });
//     }
// });

// 

module.exports = router;
