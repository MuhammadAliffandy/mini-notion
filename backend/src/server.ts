import app from './app';
const PORT = process.env.PORT || 5000;

app.get('/', async(req, res) => {
  res.status(200).json({ message: "Ping successfully" });
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
