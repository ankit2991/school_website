// import React from 'react'

// function Loader() {
//  const PageLoader = ({ show }) => {
//   if (!show) return null;

//   return (
//     <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-[9999]">
//       <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
//     </div>
//   );
// };
// }

import React from "react";

function Loader({ show }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white/60 flex items-center justify-center z-[9999]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
    </div>
  );
}

export default Loader;
