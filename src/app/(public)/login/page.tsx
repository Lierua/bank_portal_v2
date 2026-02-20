"use client";

export default function Login() {
  const login = async () => {
    document.cookie = "dev-login=true; path=/";
    window.location.href = "/requests";
  };

  return;
  <div className="">
    <button onClick={login}>Log ind (dev)</button>;
  </div>;
}
