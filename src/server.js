import app from "./app/app.js";
import myDB from "./config/db.js";

await myDB()

// const port=3000
// app.listen(port,()=>{
//     console.log(`server is running on ${port}`);
// })

export default app