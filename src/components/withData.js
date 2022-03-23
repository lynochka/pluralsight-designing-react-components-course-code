function withData(maxSpeakersToShow) {
  return function (Component) {
    const speakers = [
      { imageSrc: "speaker-1124", name: "Douglas Crockford" },
      { imageSrc: "speaker-1530", name: "Tamara Baker" },
      { imageSrc: "speaker-10803", name: "Eugune Chuvyrov" },
    ];

    return function () {
      const limitSpeakers = speakers.slice(0, maxSpeakersToShow);
      return <Component speakers={limitSpeakers}></Component>;
    };
  };
}

export default withData;

// Our original function (with rendering of Component based on speakers)
// is now returned to the caller instead of simply being passed directly.
