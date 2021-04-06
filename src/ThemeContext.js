import { createContext } from "react";

// this context is globally available to all the components of react & generally its used to contain & use the user information after a user logs in
// but here we are just using to create a theme context which can be used in any component
// and you can create context with any dataset - like array, string, object, even a hook
// in this case we have passed a hook to createContext
const ThemeContext = createContext(["green", () => {}]);

export default ThemeContext;
