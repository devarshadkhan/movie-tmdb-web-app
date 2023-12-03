
import { useContext, createContext, useState } from "react";

const LoaderContext = createContext(null);

export const useLoader = () => useContext(LoaderContext);

export const Loader_Provider = ({ children }) => {
  const [loader, setLoader] = useState(false);

  

  return (
    <>
      <LoaderContext.Provider
        value={{ loader,setLoader,}}
      >
        {children}
        
      </LoaderContext.Provider>
    </>
  );
};

LoaderContext.js

// import React, { createContext, useContext, useState } from "react";

// const LoaderContext = createContext();

// export const Loader_Provider = ({ children }) => {
//   const [loader, setLoader] = useState(false);
//   const [error, setError] = useState(null); // New state for error

//   const showLoader = () => setLoader(true);
//   const hideLoader = () => setLoader(false);

//   const showError = (errorMessage) => setError(errorMessage);
//   const clearError = () => setError(null);

//   return (
//     <LoaderContext.Provider
//       value={{
//         loader,
//         showLoader,
//         hideLoader,
//         error,
//         showError,
//         clearError,
//       }}
//     >
//       {children}
//     </LoaderContext.Provider>
//   );
// };

// export const useLoader = () => {
//   const context = useContext(LoaderContext);
//   if (!context) {
//     throw new Error("useLoader must be used within a LoaderProvider");
//   }
//   return context;
// };
