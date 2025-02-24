import { ISubmoduleManager, SubmoduleManager } from "./SubmoduleManager";
import { ErrorsManager } from "../services/ErrorManager/ErrorManager";
import { SubmoduleParser } from "../services/SubmoduleParser/SubmoduleParser";
import { SubmoduleUpdater } from "../services/SubmoduleUpdater/SubmoduleUpdater";

export const modulesArrayRegExp = new RegExp(/\[.*?\]/);

export interface IMainApp {
  init(): void;
}

export class MainApp implements IMainApp {
  private submoduleManager: ISubmoduleManager;
  private modulesArrayRegExp = modulesArrayRegExp;

  constructor() {
    const errorsManager = new ErrorsManager();
    const submoduleParser = new SubmoduleParser(
      errorsManager,
      this.modulesArrayRegExp
    );
    const submoduleUpdater = new SubmoduleUpdater(this.modulesArrayRegExp);
    this.submoduleManager = new SubmoduleManager(
      errorsManager,
      submoduleParser,
      submoduleUpdater
    );
  }

  public init() {
    Neutralino.init();

    Neutralino.events.on("generate", (event: CustomEvent) => {
      const { userConfig, submodulesList } = event.detail;
      try {
        const result = this.submoduleManager.processSubmodules(
          userConfig,
          submodulesList
        );
        Neutralino.events.dispatch("generated", { result });
      } catch (error) {
        console.error(error);
        Neutralino.events.dispatch("error", { error });
      }
    });

    Neutralino.events.on("copy", (event: CustomEvent) => {
      const { text } = event.detail;

      Neutralino.clipboard.writeText(text);
    });

    Neutralino.events.on("windowClose", () => {
      Neutralino.app.exit();
    });
  }
}
