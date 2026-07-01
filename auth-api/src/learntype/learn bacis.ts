// Ways to Narrow Types
// 1. typeof

function add(hello:number|string){
    if(typeof hello === "string"){
        return hello.toUpperCase();
    }
    return hello;
}

// ### in operator
type user={
    name:string;
    email:string;
}

type admin={
    name:string;
    email:string;
    role:string;
}


function getUser(user:user|admin){
    if("role" in user){
        return `Admin with role ${user.role}`;
    }
    return `User with name ${user.name}`;
}
getUser({name:"John",email:"daniy#@23"}); // User with name John
getUser({name:"John",email:"daniy#@23",role:"admin"}); // Admin with role admin



