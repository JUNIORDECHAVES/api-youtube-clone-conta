import { App} from "./App";
import { env } from "./config/env";

const server = new App();

    server.app.listen(env.PORT, () => {
        console.log(`🚀 API rodando na porta ${env.PORT}`);
    });



