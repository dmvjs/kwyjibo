const config = !window.location.hostname.includes("localhost")
  ? {
      /*initialKey: 1,
      initialTempo: 84,
      fileType: ".wav",*/
    }
  : {
      initialKey: 1,
      initialTempo: 84,
      fileType: ".wav",
    };

export { config };
