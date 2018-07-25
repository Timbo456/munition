import React from "react";

export default () => {
  return (
    // can add fixed-bottom to bootstrap to hold to bottom
    <footer className="fixed-bottom bg-dark text-grey mt-5 p-2 text-center">
      Copyright &copy; {new Date().getFullYear()} The Munition
      
    <a href="https://www.ontoplist.com/blogs/the-munition_5b58edbca1ca9/" target="_blank"><img src="https://www.ontoplist.com/images/ontoplist32.png?id=5b58edbca1ca9" alt="The Munition - OnToplist.com"  height="5" width="70" /></a>
    </footer>
  );
};
