import { EventEmitter } from "events";

type Store = {
  state: Record<string, any>
   // eslint-disable-next-line @typescript-eslint/ban-types
  actions: Record<string, Function>
}

export function createStore(options: Store) {
  return new BaseStore(options)
}

class BaseStore {
  private readonly actions: any;
  private _state: any;
  private readonly dispathcer: EventEmitter;

  constructor(options: Store) {
    this.dispathcer = new EventEmitter()

    this._state = options.state
    this.actions = options.actions

    for (const key in this.actions) {
      this.dispathcer.on(key, (params) => { 
        const result = this.actions[key](this._state, params)
        this.emitChange()

        return result
      })
    }
  }

  dispatch(key: string, params: any = {}) {
    this.dispathcer.emit(key, params)
  } 

  onChange(callback: () => void) {
    this.dispathcer.on("CHANGE", callback);
    return this.removeChangeListener.bind(this, callback);
  }

  private removeChangeListener() {
    this.dispathcer.removeAllListeners("CHANGE")
  }

  get state(): any {
    return this._state
  }

  private emitChange() {
    this.dispatch("CHANGE")
  }

  public removeAllListeners() {
    this.dispathcer.removeAllListeners()
  }
}