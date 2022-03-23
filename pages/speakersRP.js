import React from "react";
import SpeakersRenderProps from "../src/components/SpeakersRenderProps";

const Speakers = () => {
  return (
    <SpeakersRenderProps>
      {({ speakers }) => {
        return (
          <div>
            {speakers.map(({ imageSrc, name }) => {
              return (
                <img
                  src={`images/${imageSrc}.jpg`}
                  alt={name}
                  key={imageSrc}
                ></img>
              );
            })}
          </div>
        );
      }}
    </SpeakersRenderProps>
  );
};

export default Speakers;

//Render prop takes an original component and creates a brand new component
//with extra capabilities.
//It takes a function that returns a React element and calls it istead of implementing its own render logic.
