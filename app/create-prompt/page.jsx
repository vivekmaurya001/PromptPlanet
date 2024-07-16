"use client";
import Form from "@components/Form";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Createprompt = () => {
  const Router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        Router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      submitting={submitting}
      post={post}
      setPost={setPost}
      handleSubmit={createPrompt}
    />
  );
};

export default Createprompt;
