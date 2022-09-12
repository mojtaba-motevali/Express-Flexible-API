import { FavoriteRepository } from "api/favorite/repository";
import { FavoriteService } from "api/favorite/service";
import { ProfileRepository } from "api/profile/repository";
import { ProfileService } from "api/profile/service";
import { SimulatorRepository } from "api/simulator/repository";
import { SimulatorService } from "api/simulator/service";
import { Container } from "inversify";

export const bootstrap = () => {
  const container = new Container();
  container
    .bind<ProfileRepository>(ProfileRepository)
    .toSelf()
    .inSingletonScope();
  container.bind<ProfileService>(ProfileService).toSelf().inSingletonScope();
  container
    .bind<SimulatorRepository>(SimulatorRepository)
    .toSelf()
    .inSingletonScope();
  container
    .bind<SimulatorService>(SimulatorService)
    .toSelf()
    .inSingletonScope();

  container
    .bind<FavoriteRepository>(FavoriteRepository)
    .toSelf()
    .inSingletonScope();
  container.bind<FavoriteService>(FavoriteService).toSelf().inSingletonScope();

  return container;
};
