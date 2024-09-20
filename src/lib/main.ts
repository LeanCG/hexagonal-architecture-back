import * as express from "express";
import { ExpressUserRouter } from "./users/infraestructure/ExpressUserRouter";

const app = express();

app.use((err: unknown,req: express.Request,res: express.Response, next:express.NextFunction ) =>{
    if(err instanceof Error){
        console.error(err.stack);
    }
    console.error(err)
    res.status(500).send("Something broke!");
});

app.listen(3000, ()=>{
    console.log("servidor corriendo en el 3000");
});

app.use(ExpressUserRouter)