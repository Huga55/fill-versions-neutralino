export const errors = {
  notFoundSubmodulesArray: "There is not Submodules array in config",
  incorrectSubmoduleVersions: "Incorrect submodule versions",
  submoduleInfoLength: "Submodule does not include 2 values",
} as const;

export interface IErrorManager {
  executeError(error: string): never;
  errors: typeof errors;
}

export class ErrorsManager implements IErrorManager {
  private readonly _errors = errors;

  public get errors(): typeof errors {
    return this._errors;
  }

  public executeError(
    error: (typeof this.errors)[keyof typeof this._errors]
  ): never {
    console.error(error);
    throw new Error(error);
  }
}
