import { RefObject, useEffect } from "react";

export function useDetectOutside(ref : RefObject<HTMLElement>, handleCallback: ()=>void) {
  useEffect(() => {
    function handleClickOutside(event : MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleCallback();
      }
    }
      
    document.addEventListener("mouseup", (e)=>{handleClickOutside(e)},{capture: true});
    return () => {
        document.removeEventListener("mouseup", (e)=>{handleClickOutside(e)},{capture: true});
    };
  }, [ref]);
}