import { useState } from "react";

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  async function submitPost(e) {
    e.preventDefault();
    try {
      const userToken = localStorage.getItem("apiPoweredBlogToken");
      const userDataJson = localStorage.getItem("apiPoweredBlogUserData");
      const userData = userDataJson && JSON.parse(userDataJson);
      const authorId = userData.id;
      await fetch(`http://localhost:3000/posts/authors/${authorId}`, {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userToken}`,
        },
      });
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  return (
    <form onSubmit={submitPost}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}
