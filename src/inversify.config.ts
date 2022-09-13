import { Container } from "inversify";
import { interfaces } from "inversify-express-utils";
import {
  FavoriteController,
  ProfileController,
  SimulatorController,
} from "./api";
import { FavoriteRepository } from "./api/favorite/repository";
import { FavoriteService } from "./api/favorite/service";
import { ProfileRepository } from "./api/profile/repository";
import { ProfileService } from "./api/profile/service";
import { SimulatorRepository } from "./api/simulator/repository";
import { SimulatorService } from "./api/simulator/service";

export const bootstrap = () => {
  const container = new Container();
  container
    .bind<interfaces.Controller>(ProfileController)
    .to(ProfileController)
    .inSingletonScope();
  container
    .bind<interfaces.Controller>(FavoriteController)
    .to(FavoriteController)
    .inSingletonScope();
  container
    .bind<interfaces.Controller>(SimulatorController)
    .to(SimulatorController)
    .inSingletonScope();
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
