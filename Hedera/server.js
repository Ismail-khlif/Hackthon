const express =require('express')
const app = express()

const userRouter =require('./src/routes/users')
const NTFRouter =require('./src/routes/NFTs')

app.use("/users", userRouter);
app.use("/NFTs", NTFRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});