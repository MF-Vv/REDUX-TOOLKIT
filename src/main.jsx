import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./utils/store"

import App from "./App"
import "./styles.css"

const container = document.getElementById("root")
const root = createRoot(container)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
