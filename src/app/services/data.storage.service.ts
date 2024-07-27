
import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  public dataMap = new BehaviorSubject<Map<string, any>>(new Map());
  constructor() {

  }


  get dataMap$() {
    return this.dataMap.asObservable();
  }

  // Method to add data
  set(key: string, value: any, skipListezation:boolean = false): void {
    if (Array.isArray(value) && !skipListezation)
    {
      this.dataMap.value.set(key, this.listToSelectMap(value));
    }
    else
    {
      this.dataMap.value.set(key, value);
    }
  }

  // Method to get data
  get(key: string): any {
    return this.dataMap.value.get(key);
  }

  getValueOrZero(key: string): any {
    return this.dataMap.value.get(key) ?? "0";
  }

  // Method to check if a key exists
  has(key: string): boolean {
    return this.dataMap.value.has(key);
  }

  // Method to delete data
  delete(key: string): boolean {
    return this.dataMap.value.delete(key);
  }

  // Method to get all keys
  keys(): IterableIterator<string> {
    return this.dataMap.value.keys();
  }

  // Method to get all values
  values(): IterableIterator<any> {
    return this.dataMap.value.values();
  }

  // Method to clear the map
  clear(): void {
    this.dataMap.value.clear();
  }

  logDataMap() {
    console.log(this.dataMap);
  }

  private listToSelectMap(list: string[]) {
    /*
    * -1 - disabled
    * 0 - not selected
    * 1 - selected
    *  */
    let newList = list.map((x) => [x,0]);
    if (newList.length != 0)
      if (newList.findIndex(x => x[1] == 1) == -1)
        newList[0][1] = 1; //first element choosed by default.
    return newList;
  }

  chooseValue(value:string, id:string) {
    /*
    change index of choosed value in selectbox list
    */
    if (!Array.isArray(this.get(id))) return; //saveness
    // console.log(value)

    //index of choosed element
    let index: number = this.get(id).map((x: any[]) => x[0]).indexOf(value);
    if (index == -1) {
      console.log("No selected element: " + value + " in list:" + this.get(id))
      console.log("Id of list: " + id)
      return;
    }


    let buffer_arr:any[] = this.get(id); //place for working
    buffer_arr.forEach((x:any[]) => {
      if ( x[1] == 1 ) x[1] = 0; //unchoosed
    });
    //console.log(index)
    buffer_arr[index][1] = 1; //choose
    this.set(id,buffer_arr,true); //refresh value
    // console.log(id, value, index,"Real Value : ", this.getChoosedValue(id));
    //console.log(this.get(id))
  }
  chooseIndex(index:string, id:string) {
    /*
    change index of choosed value in selectbox list
    */
    if (!Array.isArray(this.get(id))) return; //saveness
    // console.log(value)

    let buffer_arr:any[] = this.get(id); //place for working
    buffer_arr.forEach((x:any[]) => {
      if ( x[1] == 1 ) x[1] = 0; //unchoosed
    });
    //  console.log(index)
    buffer_arr[parseInt(index)][1] = 1; //choose
    this.set(id,buffer_arr,true); //refresh value

  }

  getChoosedValueIndex(id:string) : number {
    if (!this.get(id)) return -1; //if array doesn't exist

    let buffer_arr:any[] = this.get(id); //place for working
    for (let i = 0; i < buffer_arr.length; i++) //every element
    {
      if (buffer_arr[i][1] == 1) return i; //return index of choosed
    }
    return -1; //no found
  }

  getChoosedValue(id:string) : any {
    if (!this.get(id)) return -1; //if array doesn't exist

    let buffer_arr:any[] = this.get(id); //place for working
    for (let i = 0; i < buffer_arr.length; i++) //every element
    {
      if (buffer_arr[i][1] == 1) return buffer_arr[i][0]; //return index of choosed
    }
    return -1; //no found
  }


}
