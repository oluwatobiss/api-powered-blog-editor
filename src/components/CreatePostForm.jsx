import { useEffect, useState } from "react";

// const userTokenJson = sessionStorage.getItem("apiPoweredBlogToken");
// const userToken = userTokenJson && JSON.parse(userTokenJson);

export default function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [myJwt, setMyJwt] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userTokenJson = sessionStorage.getItem("apiPoweredBlogToken");
      const userToken = userTokenJson && JSON.parse(userTokenJson);
      await fetch("http://localhost:3000/posts", {
        method: "POST",
        body: JSON.stringify({ title, body }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${userToken?.token}`,
        },
      });
      window.location.href = "/";
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }

  useEffect(() => {
    const expectedOrigin = "http://localhost:4321";
    function handleMessageEvent(e) {
      console.log("=== handleMessageEvent ===");
      console.log(e);
      if (e.origin === expectedOrigin) {
        console.log("=== useEffect === ");
        console.log(e.data);

        const jwtObj = JSON.parse(e.data);
        if (jwtObj !== null) {
          localStorage.setItem("apiPoweredBlogToken", JSON.stringify(jwtObj));
          setMyJwt(JSON.stringify(jwtObj));
        }
      }
    }
    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  });

  return (
    <>
      {console.log(myJwt)}

      <p>Joy and {myJwt}</p>
      <form onSubmit={handleSubmit}>
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
    </>
  );
}
