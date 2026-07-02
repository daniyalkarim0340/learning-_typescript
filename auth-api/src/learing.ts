// ✅ Basic Types (string, number, boolean)   done
// ✅ Arrays & Tuples   done
// ✅ Enums   done
// ✅ type and interface     done
// ✅ Union (|) & Intersection (&)      done
// ✅ Type Aliases
// ✅ Type Narrowing (typeof, instanceof, type guards)    half
// ✅ void, never, unknown, any     done
// ✅ keyof
// ✅ typeof (type queries)
// ✅ Indexed Access Types (T[K])
// ✅ Generics (<T>)  done
// ✅ Utility Types (Partial, Pick, Omit, Record, etc.)
// ✅ Conditional Types (extends)
// ✅ infer
// ✅ Mapped Types

import { log } from "console";



// ✅ Arrays & Tuples

// const numbers: number[] = [1, 2, 3, 4, 5];
// const names: string[] = ["Alice", "Bob", "Charlie"];
// const ratings: Array<number> = [4.5, 3.8, 4.9];
//  type fruit={
//     name:string,
//     color:string,
//     price:number
//  }

//  const fruits: fruit[] = [
//     { name: "Apple", color: "Red", price: 1.5 },
//     { name: "Banana", color: "Yellow", price: 0.5 },
//     { name: "Orange", color: "Orange", price: 0.8 },
//   ];


//   let tuple: [string, number, boolean?] = ["Alice", 30, true];
//   tuple=["Bob", 25]; // ✅ Valid assignment


// //  read only tuples
// let readonlyTuple: readonly [string, number] = ["Alice", 30];

// // ✅ Enums
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}


// ✅ Generics (<T>)

let identity = <T>(arg: T): T => {
  return arg;
}

identity<number>(42); // ✅ Returns 42
identity<string>("Hello"); // ✅ Returns "Hello"