const context = new AudioContext();
context.suspend();

const getContext = () => context;

export { context, getContext };
