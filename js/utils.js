import { filetype } from "./filetype.js";

export const file = (int, isLead) =>
  `../music/${String(int).padStart(8, "0")}-${
    isLead ? "lead" : "body"
  }${filetype}`;

export const hasError = () => (window.location = "/");

export const parseTracks = (tracksFromURL) => {
  let tracks;
  try {
    // if you just provide a number value for tracks it will repeat a single track
    if (typeof tracks === "number") {
      tracks = [[tracks]];
    } else {
      tracks = JSON.parse(tracksFromURL);
    }
  } catch (e) {
    if (!Array.isArray(tracks)) {
      // a string like this will also work: 1,2-3,4-5,6 and will evaluate to [[1,2],[3,4],[5,6]]
      tracks = tracksFromURL
        .split("-")
        .filter(Boolean)
        .map((x) =>
          x
            .split(",")
            .filter(Boolean)
            .map((v) => parseInt(v, 10)),
        );
    }
  }
  return tracks;
};
