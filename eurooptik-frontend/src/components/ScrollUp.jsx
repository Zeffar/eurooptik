import React from 'react';

const ScrollUp = () => {
  // NOTE: The logic to show/hide this based on scroll position will be done
  // in App.jsx using `useState` and `useEffect`.
  return (
    <div className="scroll-up">
      <a href="#totop"><i className="fa fa-angle-double-up"></i></a>
    </div>
  );
}

export default ScrollUp;