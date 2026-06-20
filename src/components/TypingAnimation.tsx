"use client";

import { useEffect, useState, useCallback } from "react";

interface TypingAnimationProps {
  titles: string[];
  typingSpeed?: number;
  deleteSpeed?: number;
  delayBetween?: number;
  className?: string;
}

export default function TypingAnimation({
  titles,
  typingSpeed = 100,
  deleteSpeed = 50,
  delayBetween = 2000,
  className = "",
}: TypingAnimationProps) {
  const [text, setText] = useState("");
  const [titleIndex, setTitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const animateText = useCallback(() => {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
      setText(currentTitle.substring(0, text.length - 1));
    } else {
      setText(currentTitle.substring(0, text.length + 1));
    }
  }, [text, titleIndex, isDeleting, titles]);

  useEffect(() => {
    const currentTitle = titles[titleIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && text === currentTitle) {
      timeout = setTimeout(() => setIsDeleting(true), delayBetween);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timeout = setTimeout(
        animateText,
        isDeleting ? deleteSpeed : typingSpeed
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, titleIndex, titles, typingSpeed, deleteSpeed, delayBetween, animateText]);

  return (
    <span className={`typing-cursor ${className}`}>
      {text}
    </span>
  );
}
