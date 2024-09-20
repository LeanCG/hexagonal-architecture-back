import * as express from "express";
import { ExpressUserRouter } from "./lib/users/infraestructure/ExpressUserRouter";

const app = express();
app.use(express.json());
app.use(ExpressUserRouter);

app.use((err: unknown,req: express.Request,res: express.Response, next:express.NextFunction ) =>{
    if(err instanceof Error){
        console.error(err.stack);
        return res.status(500).json({erro:err.message});
    }
    console.error(err)
    return res.status(500).json("Something broke!");
});

app.listen(3000, ()=>{
     console.log("servidor corriendo en el http://localhost:3000");
});

