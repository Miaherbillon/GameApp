import { StyleSheet, Text, View, ScrollView, ImageBackground } from 'react-native';
import Img from '../img/4.jpg';

export default function Home() {


    return <View style={styles.container}>
        <Text style={styles.Titre}>Jeux des questions</Text>

        <ImageBackground source={Img} style={styles.image} />
        <ScrollView >

            <Text style={styles.Titre2}>Voici comment jouer : </Text>

            <View style={styles.explication}>

                <Text style={styles.explicationText}> 1. **Répondre aux questions :** Utilise un simple mouvement de balayage pour répondre aux questions. Si tu es d'accord avec la question, fais glisser vers la droite pour répondre "oui". Si tu n'es pas d'accord, fais glisser vers la gauche pour répondre "non". </Text>

                <Text style={styles.explicationText}> 2. **Questions aléatoires :** Les questions posées sont sélectionnées de manière aléatoire parmi une grande variété de sujets. Cela rend le jeu toujours intéressant et surprenant ! </Text>

                <Text style={styles.explicationText}> 3. **Contribuer aux questions :** Une partie des questions que tu verras ont été posées par d'autres joueurs, tout comme toi. Tu as également la possibilité de contribuer au jeu en créant tes propres questions. Il suffit de les soumettre et de les partager avec la communauté ! </Text>

                <Text style={styles.explicationText}>  4. ** Suivre l'évolution :** Une fois que tu as proposé une question, tu peux suivre son évolution dans le jeu. Voir combien de joueurs l'ont vu, combien ont répondu "oui" ou "non", et ainsi de suite. </Text >

                <Text style={styles.explicationText}> 5. ** Anonymat garanti:** Toutes les réponses que tu donnes et que les autres joueurs donnent restent totalement anonymes.C'est un espace sûr pour s'exprimer librement et partager des opinions sans crainte. </Text >

                <Text style={styles.Titre2}>  Alors, prêt à commencer ? </Text>
            </View>

        </ScrollView>


    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        backgroundColor: 'rgb(30, 30, 30)',

    },
    Titre: {
        textAlign: 'center',
        color: 'black',
        paddingTop: 100,
        padding: 40,
        paddingBottom: 100,
        lineHeight: 70,
        fontSize: 50,
        zIndex: 1,
        // borderBottomColor: 'rgb(53, 11, 181)',
        borderBottomWidth: 20,
        fontWeight: 'bold',

    },
    explication: {
        gap: 20,
        fontSize: 20,
        backgroundColor: 'white',
        paddingTop: 30,

    },

    explicationText: { color: 'black', paddingLeft: 30, paddingRight: 30 },

    Titre2: {
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 25,
        lineHeight: 50,
        textAlign: 'center',
        backgroundColor: 'white',
        width: '100%',
        flex: 1,
        fontWeight: 'bold',
        color: 'rgb(229, 85, 67))'

    },

    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',

    },
});