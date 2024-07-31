import { NextResponse } from "next/server";
import connectDB from "../../../utils/Db";
import Post from "../../../Models/Post";


export const GET=async (request)=>{
    const url=new URL(request.url);
     const username=url.searchParams.get("username");
     console.log(username)


    try{
        await connectDB();
        const Posts=await Post.find(username && {username:username});

        return new NextResponse(JSON.stringify(Posts), { status: 200 })

    } catch(err){
        return new NextResponse("Connection Error",console.log(err) , { status: 500 }) 

    }


}


export const POST=async (request)=>{
    
    try{
        await connectDB();
        const body=await request.json();
        const newPost=new Post(body);
        await newPost.save();
        return new NextResponse("Post Added Successfully", { status: 201 })
    } catch(err){
        return new NextResponse("Connection Error",console.log(err) , { status: 500 })  

    }

}