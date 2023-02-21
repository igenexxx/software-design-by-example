export class Pledge {
  constructor(action) {
    this.actionCallbacks = [];
    this.errorCallback = () => {};

    action(this.onResolve.bind(this), this.onReject.bind(this));
  }

  then(actionCallback) {
    this.actionCallbacks.push(actionCallback);
    return this;
  }

  catch(errorCallback) {
    this.errorCallback = errorCallback;
    return this;
  }

  onResolve(value) {
    try {
      this.actionCallbacks.reduce((currentValue, actionCallback) => {
        return actionCallback(currentValue);
      }, value)
    } catch (e) {
      this.actionCallbacks = [];
      this.onReject(e);
    }
  }

  onReject(error) {
    this.errorCallback(error);
  }
}
