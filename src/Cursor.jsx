import { useEffect } from "react";
import PropTypes from "prop-types";

const createCursorElement = (color, size) => {
  const cursor = document.createElement("div");
  cursor.classList.add("cursor");
  cursor.style.width = `${size}px`;
  cursor.style.height = `${size}px`;
  cursor.style.backgroundColor = color;
  return cursor;
};

const createSmoothMove = (cursor, smoothness, stretchFactorMultiplier) => {
  let x = window.innerWidth / 2;
  let y = window.innerHeight / 2;
  let targetX = x;
  let targetY = y;
  let prevX = x;
  let prevY = y;
  let velocityX = 0;
  let velocityY = 0;

  const move = () => {
    const distX = targetX - x;
    const distY = targetY - y;

    x += distX * smoothness;
    y += distY * smoothness;

    velocityX = x - prevX;
    velocityY = y - prevY;

    prevX = x;
    prevY = y;

    const speed = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
    const stretchFactor = Math.min(speed / stretchFactorMultiplier, 2);

    const angle = Math.atan2(velocityY, velocityX);

    cursor.style.transform = `translate(${x}px, ${y}px) scale(${
      1 + stretchFactor
    }, ${1 - stretchFactor / 2}) rotate(${angle}rad)`;

    requestAnimationFrame(move);
  };

  const updateTarget = (newX, newY) => {
    targetX = newX;
    targetY = newY;
  };

  return { move, updateTarget };
};

const setupEventListeners = (cursor, updateTarget, hoverScale, activeScale) => {
  const handleMouseMove = (e) => {
    updateTarget(e.clientX, e.clientY);
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

  const handleFullscreenChange = () => {
    const fullscreenElement = document.fullscreenElement;
    if (fullscreenElement) {
      fullscreenElement.appendChild(cursor);
    } else {
      document.body.appendChild(cursor);
    }
  };

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mousedown", handleMouseDown);
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("fullscreenchange", handleFullscreenChange);

  const interactiveElements = document.querySelectorAll(
    "a, button, input, textarea, video, audio"
  );
  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
  });

  return () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mousedown", handleMouseDown);
    document.removeEventListener("mouseup", handleMouseUp);
    document.removeEventListener("fullscreenchange", handleFullscreenChange);

    interactiveElements.forEach((element) => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    });
  };
};

const CustomCursor = ({
  color = "#000",
  size = 20,
  smoothness = 0.1,
  stretchFactorMultiplier = 10,
  hoverScale = 1.2,
  activeScale = 0.8,
}) => {
  useEffect(() => {
    const cursor = createCursorElement(color, size);
    document.body.appendChild(cursor);

    const { move, updateTarget } = createSmoothMove(
      cursor,
      smoothness,
      stretchFactorMultiplier
    );
    const cleanupEventListeners = setupEventListeners(
      cursor,
      updateTarget,
      hoverScale,
      activeScale
    );

    move();
    return () => {
      document.body.removeChild(cursor);
      cleanupEventListeners();
    };
  }, [
    color,
    size,
    smoothness,
    stretchFactorMultiplier,
    hoverScale,
    activeScale,
  ]);

  return null;
};

CustomCursor.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
  smoothness: PropTypes.number,
  stretchFactorMultiplier: PropTypes.number,
  hoverScale: PropTypes.number,
  activeScale: PropTypes.number,
};

export default CustomCursor;

// TODO
// Покажи курсор внутри которого видео?
// Покажи курсор с текстом?
// Cursor color=“blue” width=90, src=./maxgay, text=“gay” - настройка через пропсы
