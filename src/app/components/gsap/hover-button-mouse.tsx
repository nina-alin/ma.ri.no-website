import gsap from "gsap";
import { useCallback, useLayoutEffect, useState } from "react";

const useHoverButtonMouse = (target: string, isHovered: boolean) => {
  const targetQuery = document.querySelector(target);

  const mouveMove = useCallback(
    (event: MouseEvent) => {
      if (!targetQuery) return;
      const { offsetX: x, offsetY: y } = event;

      const {
        width,
        height,
        x: testX,
        y: testY,
      } = targetQuery.getBoundingClientRect();
      console.log(testX, testY, x, y);
      const move = 25;
      const xMove = (x / width) * (move * 2) - move;
      const yMove = (y / height) * (move * 2) - move;

      gsap.to(targetQuery, {
        duration: 1,
        transform: `translate(${xMove}px, ${yMove}px)`,
      });
    },
    [targetQuery],
  );

  const mouveLeave = useCallback(() => {
    gsap.to(targetQuery, {
      duration: 2,
      transform: `translate(0,0)`,
      borderRadius: "0",
    });
  }, [targetQuery]);

  useLayoutEffect(() => {
    if (isHovered) {
      window.addEventListener("mousemove", mouveMove);
    } else {
      window.removeEventListener("mousemove", mouveMove);
      mouveLeave();
    }

    return () => window.removeEventListener("mousemove", mouveMove);
  }, [mouveLeave, mouveMove, targetQuery, isHovered]);
};

export default useHoverButtonMouse;
