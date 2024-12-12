
type JsonData = Record<string, any>;

abstract class Model<T = JsonData>
{
  protected primaryKey = 'id';
  protected attributes?: T;
  
  protected result?:  Model<T>[];
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


  protected pivotData(targetModel: any, pivotModel: any, pivotId: string, pivotTargetId: string)
  {
    const targetModelV = targetModel;
    const targetModelData = targetModelV.build().toRaw() as [];
    const targetModelPk = targetModelV.primaryKey;
    const pivotModelData = pivotModel.build().toRaw();
    const modelData = this.build().toRaw() as [];
    const collections: any[] = [];

    for(const tmodelData of modelData) {
      let tempObject: any = {...tmodelData as any} ;
      
      const findJoinData = pivotModelData.filter((data: T) => (data as JsonData)[pivotId] === tmodelData[this.primaryKey]) as any[];
      let joinData : any[] = [];
      for(const ttargetData of findJoinData) {
        const findTargetData = targetModelData.filter((data: T) => (data as JsonData)[targetModelPk] === ttargetData[pivotTargetId]) as any[];
        joinData = [...joinData, ...findTargetData];
      }
      tempObject['joinData'] = joinData;

      collections.push(tempObject);
    }
    
    return collections;
  }

  abstract data() : any[];
}


export default Model;