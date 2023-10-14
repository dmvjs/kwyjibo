import { render } from 'preact';

const App = <h1>Hello World!</h1>;

// Inject our app into the DOM
render(App, document.getElementById('app'));
