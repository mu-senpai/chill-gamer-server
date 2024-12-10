require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(express.json())
app.use(cors())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5rohj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const database = client.db("reviewDB");
        const reviewCollection = database.collection("reviews");

        const watchListItemsCollection = database.collection("watchListItems");

        const userCollection = client.db("reviewDB").collection("users");

        app.get('/reviews', async (req, res) => {
            const { sortBy, genre } = req.query;

            let query = {};
            if (genre) {
                query.genre = genre;
            }

            let sort = {};
            if (sortBy === 'rating-asc') {
                sort = { rating: 1 };
            } else if (sortBy === 'rating-desc') {
                sort = { rating: -1 };
            } else if (sortBy === 'year-asc') {
                sort = { publishYear: 1 };
            } else if (sortBy === 'year-desc') {
                sort = { publishYear: -1 };
            }

            const cursor = reviewCollection.find(query).sort(sort);
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await reviewCollection.findOne(query);
            res.send(result);
        })

        app.get('/reviews/email/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/highestratedgames', async (req, res) => {
            const cursor = reviewCollection.find().sort({ rating: -1 }).limit(6);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/watchlist', async (req, res) => {
            const cursor = watchListItemsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/watchlist/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const cursor = watchListItemsCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/watchlist', async (req, res) => {
            const newItem = req.body;
            const result = await watchListItemsCollection.insertOne(newItem);
            res.send(result);
        })

        app.post('/reviews', async (req, res) => {
            const newReview = req.body;
            const result = await reviewCollection.insertOne(newReview);
            res.send(result);
        })

        app.delete('/reviews/id/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })

        app.put('/reviews/id/:id', async (req, res) => {
            const id = req.params.id;
            const review = req.body;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updatedReview = {
                $set: {
                    name: review.name,
                    email: review.email,
                    gameTitle: review.gameTitle,
                    genre: review.genre,
                    rating: review.rating,
                    publishYear: review.publishYear,
                    cover: review.cover,
                    review: review.review,
                }
            };
            const result = await reviewCollection.updateOne(filter, updatedReview, options);
            res.send(result);
        })

        // User related APIs
        app.get('/users', async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/users/:uid', async (req, res) => {
            const uid = req.params.uid;
            const query = { uid: uid };
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        app.post('/users', async (req, res) => {
            const newUser = req.body;
            console.log(newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result);
        })

        app.put('/users', async (req, res) => {
            const user = req.body;
            const filter = { email: user.email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: user.name,
                    email: user.email,
                    photo: user.photo,
                    createdAt: user.createdAt,
                    uid: user.uid,
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        });

        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Chill gamer server is running!');
})

app.listen(port, () => {
    console.log(`Chill gamer server is running on PORT: ${port}`);
})