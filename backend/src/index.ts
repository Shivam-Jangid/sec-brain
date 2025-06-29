import express, { Response, Request } from "express";
import { ContentModel, LinkModel, UserModel } from "./db";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userMiddleWare } from "./middleware";
import { JWT_PASS } from "./config";
import cors from 'cors';
interface AuthenticatedRequest extends Request {
  userId?: string,
  username?:string
}
const app = express();

app.use(express.json());
app.use(cors());

const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
app.post(
  "/api/v1/signup",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const parsedData = signupSchema.parse(req.body);
      const { username, email, password } = parsedData;
      //hash the password
      for(let i=0;i<username.length;i++){
        if(username[i] == ' '){
          res.status(404).json({
            msg:"no spacebar should be present in the username"
          })
        }
      }
      const user = new UserModel({ username, email, password });
      await user.save();
      res.status(200).json({ msg: " User created successfully" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: err.errors,
        });
      }
      res.status(500).json({ error: "User already exists" });
    }
  }
);


app.post("/api/v1/signin", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsedData = signinSchema.parse(req.body);
    const { email, password } = parsedData;

    const user = await UserModel.findOne({ email });

    if(user && user.password == password){
      const token = jwt.sign(
        {
          id: user._id,
          username:user.username
        },
        JWT_PASS
      );
      res.status(200).json({ msg: " User signed in successfully", token });
    }
    else if (!user){
      res.json(403).json({
        msg:'user not found'
      })
    }
    else if(user.password!=password){
        res.json(411).json({
        msg:'Invalid password'
      })
    }
    else{
      res.status(503).json({
        msg:"Server error"
      })
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation failed",
        details: err.errors,
      });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/v1/content", userMiddleWare, async (req:AuthenticatedRequest, res):Promise<void> => {
    const {title, link, type, tags, description} = req.body;
    const userId = req.userId;
    try{
      const newContents = new ContentModel({title, link, type, tags, userId, description});
      const content = await newContents.save();
      res.status(200).json({
        msg :"contents added"
      });
    }
    catch (err){
      res.status(503).json({
        msg:"Server Error"
      })
    }
});

app.get(
  "/api/v1/content",
  userMiddleWare,
  async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    try {
      const Data = await ContentModel.find({ userId }).populate(
        "userId", "username"
      );
      res.status(200).json({ Data });
    } catch (err) {
      res.status(500).json({ msg: "Error occurred"});
    }
  }
);

app.delete("/api/v1/content",userMiddleWare,async (req:AuthenticatedRequest, res:Response):Promise<void> => {
    const contentId = req.body.contentId;
    const userId = req.userId;
    try{
        await ContentModel.deleteMany({
            _id:contentId,
            userId:userId
        }) 
        res.status(200).json({
            message :"Content deleted successfully"
        })
    }
    catch(err){
        res.status(403).json({
            msg:"error occured",
            err
        })
    }
})
app.post("/api/v1/brain/share",userMiddleWare,async (req:AuthenticatedRequest, res):Promise<any> => {
  const userId = req.userId;
  const share = req.body.share;

  if (share){
    try{
      const hash = `${userId}`;
      const link = new LinkModel({hash, userId});
      await link.save();
      return res.status(200).json({
        link:hash
      })
    }
    catch(err){
      res.status(500).json({
        msg:"Server Error"
      })
    }
  }
  else {
    try{
      await LinkModel.deleteMany({
        userId
      })
      res.status(200).json({
        msg:"Link disabled"
      })
    }
    catch{
      res.status(503).json({
        msg:"Server Error"
      }
    )}
  }
});

app.get('/api/v1/brain/:shareLink', async (req,res)=>{
  const sharedUserId = req.params.shareLink;
    try {
      const Data = await ContentModel.find({ userId:sharedUserId });
      res.status(200).json({ Data, sharedUserId });
    } catch (err) {
      res.status(500).json({ msg: "Error occurred"});
    }
});

app.listen(3000);
