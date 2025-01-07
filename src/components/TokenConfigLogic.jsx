import { useEffect } from "react";

export default function TokenConfigLogic() {
  useEffect(() => {
    const expectedOrigin = "http://localhost:4321";
    function handleMessageEvent(e) {
      if (e.origin === expectedOrigin) {
        const jwtObj = JSON.parse(e.data);
        if (jwtObj !== null) {
          localStorage.setItem("apiPoweredBlogToken", JSON.stringify(jwtObj));
        }
      }
    }
    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  });
  return <p>This page is solely for configuring the app's token.</p>;
}
