import { PORT } from './envs';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';


(async()=> {
  main();
})();


function main() {

  const server = new Server({
    port: PORT,
    routes: AppRoutes.routes,
  });

  server.start();
}



