import React from "react";

export default () => {
  return (
    // can add fixed-bottom to bootstrap to hold to bottom
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} The Munition (a ST joint!)
    </footer>
  );
};
