// Imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import router from './src/routes/routes.js';
import problem from './src/routes/problems.route.js';

// Constants
const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.send("<h1>Code Mafia API ENDPOINT</h1>");
});
app.use("/api", router);
app.use("/problem", problem);



const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// SIGN UP
app.post("/signup", async (req, res) => {
  const { email, password, fullname } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { fullname } },
  });

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json({ user: data.user });
});

//  LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return res.status(400).json({ error: error.message });
  res.json({ user: data.user, session: data.session });
});

// LOGOUT
app.post("/logout", async (req, res) => {
  const { error } = await supabase.auth.signOut();

  if (error) return res.status(400).json({ error: error.message });
  res.json({ message: "Logged out successfully" });
});

// GET CURRENT USER
app.get("/user", async (req, res) => {
  const { data, error } = await supabase.auth.getUser();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
});