import { useEffect } from "react";

export default function TokenConfigLogic() {
  useEffect(() => {
    const expectedOrigin = "http://localhost:4321";
    function handleMessageEvent(e) {
      console.log("=== TokenConfigLogic ===");
      console.log(e);

      if (e.origin === expectedOrigin) {
        const token = e.data;
        if (token !== null) {
          localStorage.setItem("apiPoweredBlogToken", token);
        }
      }
    }
    window.addEventListener("message", handleMessageEvent);
    return () => window.removeEventListener("message", handleMessageEvent);
  });
  return <p>This page is solely for configuring the app's token.</p>;
}
