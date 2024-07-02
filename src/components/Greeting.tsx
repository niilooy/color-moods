import React, { useState, useEffect } from "react";

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return <h1>{greeting}</h1>;
};

export default Greeting;
