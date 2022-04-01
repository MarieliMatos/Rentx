import { container } from "tsyringe";

import { IDateProvider } from "./dateProvider/IDateProvider";
import { DateJSDateProvider } from "./dateProvider/implemetations/dayjsDateProvider";

container.registerSingleton<IDateProvider>(
  "DateJSDateProvider",
  DateJSDateProvider
);
