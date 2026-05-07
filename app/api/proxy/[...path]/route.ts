export async function GET(req:Request, {params}:{params:Promise<{path:string[]}>}){//what is Request type here?
    const {path} = await params;
    const {search} = new URL(req.url);
    console.log("the search is",search);
    const url = `https://dummyjson.com/${path.join('/')}${search}`;
    const res = await fetch(url);
    const data = await res.json();
    return Response.json(data); //what is Response here?
}

export async function POST(req:Request,{params}:{params:Promise<{path:string[]}>}){

const {path}= await params;
const body = await req.json();
console.log("the body", body);

const res  = await fetch(`https://dummyjson.com/${path.join('/')}`,{
    method:'POST',
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(body),
});
const data = await res.json();
return Response.json(data);
}





/* 

using fetch by using useEffect , browser directly talk to sever: like dummyjson which is on different url, so browser restrict & dont give back to the data as security reasons,so thats why its using the proxy server

Step-by-Step What Happens

You write:

fetch("/api/proxy/products")
STEP 1 — Browser Reads URL

Browser sees:

/api/proxy/products

This is relative URL.

So browser converts it into:

http://localhost:3000/api/proxy/products

because your app runs on:

localhost:3000
STEP 2 — Browser Sends Request

Browser sends HTTP request to:

localhost:3000

which is your Next.js server.

STEP 3 — Next.js Receives Request

Next.js checks routes.

It finds:

app/api/proxy/[...path]/route.ts

because URL matches:

/api/proxy/products
STEP 4 — route.ts Executes

Now THIS code runs on server:

const url = `https://dummyjson.com/${path.join("/")}`;

becomes:

https://dummyjson.com/products
STEP 5 — Next.js Server Fetches DummyJSON

Now server does:

await fetch("https://dummyjson.com/products")

This is:

SERVER ---> dummyjson.com

NOT browser.

So no CORS restriction.

STEP 6 — DummyJSON Returns Data
dummyjson.com
      ↓
Next.js Server
STEP 7 — Your Server Sends Response Back
Next.js Server
      ↓
Browser

using:

return Response.json(data);


*/