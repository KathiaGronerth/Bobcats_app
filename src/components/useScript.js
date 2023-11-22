import { useEffect, useState } from "react";

const useScript = (src) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = src;
    script.async = true;

    script.addEventListener("load", () => {
      setScriptLoaded(true);
    });

    script.addEventListener("error", (error) => {
      setScriptError(error);
    });

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [src]);

  return [scriptLoaded, scriptError];
};

export default useScript;
