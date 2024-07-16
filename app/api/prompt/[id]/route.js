import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET Read
export const GET = async (request, { params }) => {
  console.log("params:", params);
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

//PATCH (upadate)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const Existingprompt = await Prompt.findById(params.id).populate("creator");

    if (!Existingprompt)
      return new Response("Prompt not found", { status: 404 });

    Existingprompt.prompt = prompt;
    Existingprompt.tag = tag;
    await Existingprompt.save();

    return new Response(JSON.stringify(Existingprompt), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to update prompts", {
      status: 500,
    });
  }
};

//DELETE
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", {
      status: 500,
    });
  }
};
