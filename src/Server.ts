import { App} from "./App";
import { env } from "./config/env";

const server = new App();

if (process.env.NODE_ENV !== "production"){
    server.app.listen(env.PORT, () => {
        console.log(`🚀 API rodando na porta ${env.PORT}`);
    });
}


