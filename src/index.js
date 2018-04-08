import dva from "dva";
import "./index.css";
const app = dva();
app.model(require("./model/indexModel").default);
app.router(require("./router").default);
app.start('#root');