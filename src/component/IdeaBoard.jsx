import { Copy } from "lucide-react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function IdeaBoard({ ideas, loading }) {
  const notify = () =>
    toast.success("Copied!", {
      position: "top-center",
      autoClose: 300,
      hideProgressBar: false,
      theme: "light",
    });

  const copyIdea = (index) => {
    const text = ideas[index];
    navigator.clipboard.writeText(text);
    notify();
    console.log(text);
  };

  return (
    <div className="relative flex flex-col items-center justify-center gap-3 w-11/12 mx-auto md:gap-5 md:w-12/12">
      <ToastContainer className="absolute" />

      {ideas.map((idea, index) =>
        loading ? (
          <div className="skeleton w-full text-sm font-semibold text-center h-auto cursor-pointer rounded-sm px-2 py-3 shadow-sm bg-black  text-black md:px-0">
            Ideas
          </div>
        ) : (
          <p
            key={idea}
            className="w-full text-sm font-semibold text-center cursor-pointer rounded-sm shadow-sm bg-white  text-black flex justify-between items-center py-3 px-5"
          >
            {idea}{" "}
            <span>
              <Copy
                onClick={() => copyIdea(index)}
                className="active:scale-90"
                size={20}
              />
            </span>
          </p>
        )
      )}
    </div>
  );
}

export default IdeaBoard;
