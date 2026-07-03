// ✅ Basic Types (string, number, boolean)   done
// ✅ Arrays & Tuples   done
// ✅ Enums   done
// ✅ type and interface     done
// ✅ Union (|) & Intersection (&)      done
// ✅ Type Aliases
// ✅ Type Narrowing (typeof, instanceof, type guards)    done
// ✅ void, never, unknown, any     done
// ✅ keyof
// ✅ typeof (type queries)
// ✅ Indexed Access Types (T[K])
// ✅ Generics (<T>)  done
// ✅ Utility Types (Partial, Pick, Omit, Record, etc.)
// ✅ Conditional Types (extends)
// ✅ infer
// ✅ Mapped Types

// import { log } from "console";



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
// enum Direction {
//   Up = "UP",
//   Down = "DOWN",
//   Left = "LEFT",
//   Right = "RIGHT",
// }


// // ✅ Generics (<T>)

// let identity = <T>(arg: T): T => {
//   return arg;
// }

// identity<number>(42); // ✅ Returns 42
// identity<string>("Hello"); // ✅ Returns "Hello"


// ✅ Type Narrowing (typeof, instanceof, type guards) 

// let value: string | number = "Hello";

// if (typeof value === "string") {
//   console.log("Value is a string:", value.toUpperCase());
// } 

// if (typeof value === "number") {
//   console.log("Value is a number:", value.toFixed(2));
// }


function processValue(value: string | number) {
  if (typeof value === "string") {
    console.log("Value is a string:", value.toUpperCase());
  } else if (typeof value === "number") {
    console.log("Value is a number:", value.toFixed(2));
  }
}
processValue("Hello"); // ✅ Value is a string: HELLO
processValue(42); // ✅ Value is a number: 42.00
class Animal {
}
const op=new Animal();

class food {

}
const lt=new food()

function hello(value: Animal | food) {
  if (value instanceof Animal) {
    console.log("Value is an instance of Animal");
  } else if (value instanceof food) {
    console.log("Value is an instance of food");
  }
}
hello(lt)

