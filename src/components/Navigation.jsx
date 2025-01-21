import { useEffect, useState } from "react";

export default function Navigation() {
  const [userStatus, setUserStatus] = useState("");

  useEffect(() => {
    const userDataJson = localStorage.getItem("apiPoweredBlogUserData");
    const userData = userDataJson && JSON.parse(userDataJson);
    console.log("=== Navigation useEffect ===");
    console.log(userData);

    userData?.status && setUserStatus(userData.status);
  }, []);

  console.log("=== Navigation ===");
  console.log(userStatus);

  return (
    <div className="nav-links">
      <a href="/">Home</a>
      <a href="/create-post/">Create post</a>
      {userStatus === "ADMIN" ? <a href="/manage-staff/">Manage staff</a> : ""}
    </div>
  );
}
