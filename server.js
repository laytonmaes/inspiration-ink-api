import express from "express";
const app = express();
import cors from "cors"
import { inktoberPrompts } from "./inktoberPrompts.js";
import { mediaFranchises } from "./mediaFranchises.js";
import { userPrompts } from "./userPrompts.js";

const randomIndex = (arr) => {
    return Math.floor(Math.random() * arr.length)
}

app.use(cors())
app.use(express.json());

app.set("port", process.env.PORT || 3001)
app.locals.title = "Inspiration Ink.";





app.get("/", (request, response) => {
    response.send(["philanthropy"])
})

app.get("/api/v1/mashup", (request, response) => {
    const item = mediaFranchises[randomIndex(mediaFranchises)]

    response.send([item])
})

app.get("/api/v1/inktober", (request, response) => {
    const item = inktoberPrompts[randomIndex(inktoberPrompts)]
    
    response.send([item])
})

app.get("/api/v1/user", (request, response) => {
    const item = userPrompts[randomIndex(userPrompts)]

    response.send([item])
})

app.post("/api/v1/user", (request, response) => {
    const { prompt } = request.body

    userPrompts.push(prompt)

    response.status(201).json({prompt:prompt, userPrompts})
})

app.listen(app.get("port"), () => {
    console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`)
})