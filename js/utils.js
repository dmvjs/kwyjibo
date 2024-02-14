import { filetype } from "./filetype.js";

export const file = (int, isLead) =>
  `../music/${String(int).padStart(8, "0")}-${
    isLead ? "lead" : "body"
  }${filetype}`;
