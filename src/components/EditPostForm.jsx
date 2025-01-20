import { useState } from "react";

const postDataJson = localStorage.getItem("allblogPostToEdit");
const postData = postDataJson && JSON.parse(postDataJson);

export default function EditPostForm() {
  const [title, setTitle] = useState(postData.title);
  const [body, setBody] = useState(postData.body);
  const [published, setPublished] = useState(postData.published);

  async function submitPostUpdates(e) {
    e.preventDefault();
    console.log("=== submitPostUpdates ===");
    console.log(postData);

    try {
      await fetch(`http://localhost:3000/posts/${postData.id}`, {
        method: "PUT",
        body: JSON.stringify({ title, body, published }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      window.location.href = "/";
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form onSubmit={submitPostUpdates}>
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
      <div className="publish-post-container">
        <label htmlFor="publishPost" className="publish-post-label">
          Publish Now?
        </label>
        <input
          type="checkbox"
          id="publishPost"
          checked={published}
          onChange={() => setPublished(!published)}
        />
      </div>
      <button type="submit">Update Post</button>
    </form>
  );
}
