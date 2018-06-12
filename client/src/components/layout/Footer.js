import React from "react";

export default () => {
  return (
    // can add fixed-bottom to bootstrap to hold to bottom
    <footer className="fixed-bottom bg-dark text-grey mt-5 p-2 text-center">
      Copyright &copy; {new Date().getFullYear()} The Munition (an ST joint!)
    </footer>
  );
};
