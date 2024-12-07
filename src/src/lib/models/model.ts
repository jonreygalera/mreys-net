
type JsonData = Record<string, any>;

abstract class Model<T = JsonData>
{
  protected attributes?: T;
  
  protected result?: Model<T>[];
  protected originalResult?: Model<T>[];
  protected rawData?: T[];

  build() {
    this.rawData = this.data();
    this.originalResult = this.rawData.map((item) => {
      const instance = new( this.constructor as { new (): Model<T>});
      instance.set(item)
      return instance;
    });
    this.result = this.originalResult;
    return this;
  }

  set(attributes: T) {
    this.attributes = attributes;
  }

  where(key: string, value: any) {
    const filteredData = this.getRawData().filter((data: T) => (data as JsonData)[key] === value);
    this.result = filteredData?.map(item => {
      this.set(item);
      return this;
    });
     
    return this;
  }

  getRawData() : T[] {
    return this.rawData as T[];
  }

  get(): Model<T>[] {
    return this.getResult();
  }

  first(): Model<T>[] {
    return this.getResult();
  }


  toRaw(): (T | T[]) {
    const result = this.result as ( this | this[]);
    if(Array.isArray(result)) return result.map((data: this) => data.attributes) as T[];
    
    return (result ? result.attributes : ({} as T)) as T;
  }

  protected getResult() : Model<T>[] {
    return this.result as Model<T>[];
  }

  abstract data() : any[];
}


export default Model;