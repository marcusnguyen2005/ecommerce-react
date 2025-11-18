import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container component similar to Bootstrap's container
 * - max-width: 1080px
 * - width: 80% on desktop, 95% on mobile/tablet
 * - centered with auto margins
 */
const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-[95%] md:w-[90%] lg:w-[80%] max-w-[1080px] mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default Container;

