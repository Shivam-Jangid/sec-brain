import express, { Response, Request } from "express";
import { ContentModel, UserModel } from "./db";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userMiddleWare } from "./middleware";
import { JWT_PASS } from "./config";
interface AuthenticatedRequest extends Request {
  userId?: string;
}
const app = express();
app.use(express.json());
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
app.post(
  "/api/v1/signup",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const parsedData = signupSchema.parse(req.body);
      const { username, email, password } = parsedData;

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
      res.status(500).json({ error: "Internal server error" });
    }
  }
);
const signinSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

app.post("/api/v1/signin", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const parsedData = signinSchema.parse(req.body);
    const { email, password } = parsedData;

    const user = await UserModel.findOne({ email });
    if (!user || user.password !== password) {
      res.status(503).json("Invalid email or password");
    } else {
      const token = jwt.sign(
        {
          id: user._id,
        },
        JWT_PASS
      );
      res.status(200).json({ msg: " User signed in successfully", token });
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
  const link = req.body.link;
  const title = req.body.title;
  try {
    await ContentModel.create({
      link,
      title,
      userId: req.userId,
      tags: [],
    });
     res.status(200).json({
      message: "content added",
    });
  } catch (err) {
    res.status(500).json({
        msg:"Server error occurred"
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
      console.log("New format available:", Data);
      res.status(200).json({ Data });
    } catch (err) {
      res.status(500).json({ msg: "Error occurred" });
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
// app.post("/api/v1/brain/share", (req, res) => {});
// app.post("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000);
