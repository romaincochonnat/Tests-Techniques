"use client";

// ### Part 2: Coloured Squares (Frontend)

// Create a basic web page where each of the 4 corners of the screen displays a coloured button (You pick the color for each corner!).

// Next, create a display of 10 squares in the center of the page. When one of the 4 corner buttons is clicked, it automatically updates this list of 10 squares. The center squares always display the last 10 colours that were clicked.

// On page refresh, the list is *not* emptied.

// You can use any UI library such as React, Redux, jQuery, or use vanilla Javascript.
import { useDispatch } from "react-redux";
import { addColorsToStore } from "./reducers/colors";

import { useSelector } from "react-redux";

// types.ts
export interface RootState {
  colors: {
    value: string[];
  };
}

export default function Home() {
  const dispatch = useDispatch();
  const addColor = (color: string) => dispatch(addColorsToStore(color));

  const colors = useSelector((state: RootState) => state.colors.value);
  const squaresColors = colors.map((x: string, i: number) => {
    return <div key={i} className={` ${x}`}></div>;
  });

  return (
    <main className="h-screen w-screen grid grid-cols-2 grid-rows-3">
      <button
        className="col-span-1 bg-red-400"
        onClick={() => addColor("bg-red-400")}
      >
        color 1
      </button>
      <button
        className="col-span-1 bg-green-400"
        onClick={() => addColor("bg-green-400")}
      >
        color 2
      </button>
      <div className="w-full h-full col-span-3 row-span-1 grid grid-cols-10">
        {squaresColors}
      </div>
      <button
        className="col-span-1 bg-purple-400"
        onClick={() => addColor("bg-purple-400")}
      >
        color 3
      </button>
      <button
        className="col-span-1 bg-blue-400"
        onClick={() => addColor("bg-blue-400")}
      >
        color 4
      </button>
    </main>
  );
}
