import React from "react";
function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skel-img skeleton" />
      <div className="skel-body">
        <div className="skel-line skeleton short" />
        <div className="skel-line skeleton med" />
        <div className="skel-line skeleton short" />
      </div>
    </div>
  );
}

export default SkeletonCard;
