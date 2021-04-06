import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

//create portal is used to create modals
const Modal = ({ children }) => {
  const elRef = useRef(null); // this variable will be used to clear off our modal every time its closed to avoid any memory leaks

  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current); //this return is kind of a special feature of useEffect & it cleans up code which runs at the end
  }, []); //by giving an empty array as the dependency list to useEffect, we are just making sure that we run useEffect only once & that it doesn't depend on anything else

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
