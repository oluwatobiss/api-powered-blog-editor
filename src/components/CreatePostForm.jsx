import { useState } from "react";

const backendUri = import.meta.env.PUBLIC_BACKEND_URI;

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [published, setPublished] = useState(false);
  const [errors, setErrors] = useState([]);

  async function submitPost(e) {
    e.preventDefault();
    try {
      const userToken = localStorage.getItem("apiPoweredBlogToken");
      const userDataJson = localStorage.getItem("apiPoweredBlogUserData");
      const userData = userDataJson && JSON.parse(userDataJson);
      const authorId = userData.id;
      const response = await fetch(`${backendUri}/posts/authors/${authorId}`, {
        method: "POST",
        body: JSON.stringify({ title, body, published }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const responseObj = await response.json();
      responseObj.errors?.length
        ? setErrors(responseObj.errors)
        : (window.location.href = "/");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  function showErrorFor(field) {
    return errors.find((c) => c.path === field) ? (
      <div className="error">{errors.find((c) => c.path === field).msg}</div>
    ) : (
      ""
    );
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
        {showErrorFor("title")}
      </div>
      <div>
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {showErrorFor("body")}
      </div>
      <div className="checkbox-container">
        <label htmlFor="publishPost">Publish Now?</label>
        <input
          type="checkbox"
          id="publishPost"
          checked={published}
          onChange={() => setPublished(!published)}
        />
      </div>
      <button type="submit">Add Post</button>
    </form>
  );
}
