import { useEffect } from "react";

const CustomCursor = () => {
  useEffect(() => {
    const cursor = document.createElement("div");
    cursor.style.position = "fixed";
    cursor.style.width = "20px";
    cursor.style.height = "20px";
    cursor.style.borderRadius = "50%";
    cursor.style.backgroundColor = "#000";
    cursor.style.pointerEvents = "none";
    cursor.style.transition = "transform 0.1s ease";
    cursor.style.zIndex = "9999";
    document.body.appendChild(cursor);

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
      cursor.style.backgroundColor = "red";
      cursor.style.borderRadius = "40px";
      cursor.style.width = "30px";
      cursor.style.height = "30px";
    };

    const handleMouseUp = () => {
      cursor.style.backgroundColor = "#000";
      cursor.style.width = "20px";
      cursor.style.height = "20px";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    requestAnimationFrame(smoothMove);
    return () => {
      document.body.removeChild(cursor);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleMouseDown);
    };
  }, []);
};
export default CustomCursor;
