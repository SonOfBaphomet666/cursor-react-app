import { useEffect } from "react";

const CustomCursor = () => {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  const videoElements = document.querySelectorAll("video");
  const audioElements = document.querySelectorAll("audio");

  videoElements.forEach((video) => {
    video.addEventListener("mouseenter", handleMouseEnter);
    video.addEventListener("mouseleave", handleMouseLeave);
  });

  let x = 0;
  let y = 0;
  let targetX = 0;
  let targetY = 0;

  const smoothMove = () => {
    const distX = targetX - x;
    const distY = targetY - y;

    x += distX * 0.1;
    y += distY * 0.1;

    cursor.style.left = `${x - cursor.offsetWidth / 2}px`;
    cursor.style.top = `${y - cursor.offsetHeight / 2}px`;

    requestAnimationFrame(smoothMove);
  };

  const handleMouseMove = (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  };

  const handleMouseDown = () => {
    cursor.classList.add("cursor--active");
  };

  const handleMouseUp = () => {
    cursor.classList.remove("cursor--active");
  };

  const handleMouseEnter = () => {
    cursor.classList.add("cursor--hover");
  };

  const handleMouseLeave = () => {
    cursor.classList.remove("cursor--hover");
  };

  useEffect(() => {
    targetX = window.innerWidth / 2;
    targetY = window.innerHeight / 2;
    x = targetX;
    y = targetY;

    document.body.appendChild(cursor);

    requestAnimationFrame(smoothMove);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.removeChild(cursor);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  return null;
};
export default CustomCursor;
