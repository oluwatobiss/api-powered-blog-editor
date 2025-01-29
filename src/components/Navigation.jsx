import { useEffect, useState, useRef } from "react";
const fansEndUri = import.meta.env.PUBLIC_FANSEND_URI;

export default function Navigation() {
  const [userToken, setUserToken] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const iframeUseRef = useRef(null);

  function logoutUser() {
    localStorage.removeItem("apiPoweredBlogToken");
    localStorage.removeItem("apiPoweredBlogUserData");
    localStorage.removeItem("apiPoweredBlogPostToEdit");
    if (iframeUseRef.current) {
      const targetOrigin = fansEndUri;
      const iframeWindow = iframeUseRef.current.contentWindow;
      iframeWindow.postMessage(userStatus, targetOrigin);
    }
    window.location.href = fansEndUri;
  }

  useEffect(() => {
    let userToken = localStorage.getItem("apiPoweredBlogToken");
    let userDataJson = localStorage.getItem("apiPoweredBlogUserData");

    console.log("=== Editor's Navigation useEffect ===");
    console.log(userToken);
    console.log(userDataJson);

    userToken === "undefined" && (userToken = undefined);
    userDataJson === "undefined" && (userDataJson = undefined);

    const userData = userDataJson && JSON.parse(userDataJson);
    console.log("=== Navigation useEffect ===");
    console.log(userData);

    userToken && setUserToken(userToken);
    userData?.status && setUserStatus(userData.status);
  }, []);

  console.log("=== Navigation ===");
  console.log(userStatus);

  return (
    <>
      <iframe
        id="apiBlogIframe"
        src={`${fansEndUri}/delete-user`}
        ref={iframeUseRef}
        width="0" // "800px"
        height="0" // "600px"
        style={{ border: "none" }}
      ></iframe>
      <div className="nav-links">
        <a href="/">Home</a>
        {!userToken && <a href="/sign-up">Sign up</a>}
        {userToken && userStatus === "ADMIN" ? (
          <a href="/manage-staff/">Manage staff</a>
        ) : (
          ""
        )}
        {userToken && (
          <>
            <a href="/create-post/">Create post</a>
            <span onClick={logoutUser}>Log out</span>
          </>
        )}
      </div>
    </>
  );
}
