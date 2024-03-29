const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// middleware
app.use(cors());
app.use(express.json());

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.firec.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const projectCollection = client.db("myPortfolio").collection("projects");

    app.get('/test', async(req, res)=> {
      res.send('test message green')
    })

    app.get('/projects', async(req, res)=>{
        const result = await projectCollection.find({}).toArray();
        res.send(result);
    })
    app.get('/project/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
        const result = await projectCollection.findOne(query);
        res.send(result);
    })
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello From my portfolio!");
});

app.listen(port, () => {
  console.log(`my portfolio listening on port ${port}`);
});
