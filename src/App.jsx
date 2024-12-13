// import { useState } from 'react'
// import {createBrowserRouter, RouterProvider } from 'react-router-dom'
// import MainLayout from './component/layout/MainLayout'
// import Home from './component/pages/Home'
// import FetchOld from './component/pages/FetchOld'
// import FetchRQ from './component/pages/FetchRQ'
// import  {  useQuery } from '@tanstack/react-query'

// function App() {
//   // //const [count, setCount] = useState(0)
//   // const router=createBrowserRouter([
//   //   {
//   //     path:'/',
//   //     element:<MainLayout/>,
//   //     children:[
//   //       {
//   //       path:'/',
//   //       element:<Home/>,
//   //     },
//   //     {
//   //       path:'/fq',
//   //       element:<FetchOld/>,
//   //     },
//   //     {
//   //       path:'/rq',
//   //       element:<FetchRQ/>,
//   //     },
//   //     // {
//   //     //   path:'/',
//   //     //   element:</>,
//   //     // },
    

//   //     ]

//   //   }
//   // ])


//  const {data}=useQuery({
//   queryKey:["todo"],
//   queryFn:()=> 
//       axios.get("https://jsonplaceholder.typicode.com/todos").then((res)=>
//       res.json() ),
//  });
//   //const queryClient=new QueryClient();
//   return (
//     <>
//    <div>
//     {
//       data.map((todo)=>(
//         <><li>Id:{todo.id}</li>
//         <li> Title : {todo.title} </li></>
//       ))
//     }

//    </div>

//     {/* <RouterProvider router={router}> 
    
//     </RouterProvider>
   
//     */}
//        <h1>Tanstack Query.</h1>
    
//     </>
//   )
// }

// export default App
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function App() {
  const queryClient= useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      //axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => res.data),
      axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => res.data),
  });

  const {mutate ,isError,isPending,isSuccess}=useMutation({
    mutationFn:(newPost)=>
      axios.post("https://jsonplaceholder.typicode.com/posts",newPost).then((res)=>res.data),

    onSuccess:(newPost)=>{
     queryClient.setQueryData(["posts"],(oldPosts)=>[...oldPosts,newPost]);
    },
   
  });

  if (isLoading) return <p>Loading...</p>;
  if (error||isError) return <p>Error....</p>;
  
  

  return (
    
    <div>
      { isPending && <p>Data is deing added</p>}
      {isSuccess && <p>Data was successfully added!</p>}
      
      <button onClick={()=>(mutate({
        "userId": 200,
        "id": 1000,
        "title": "This is saint tanstack learnig",
        "body": "this is add body"
      }))}>Add button </button>
      <h1>Tanstack Query</h1>
      {data.map((todo) => (
        <div key={todo.id}>
          <li>Id: {todo.id}</li>
          <li>Title: {todo.title}</li>
          <li> body: {todo.body} </li>
        </div>
      ))}
    </div>
  );
}

export default App;

