import { NextResponse } from "next/server";


import connectDB from "../../../../utils/Db";
import Post from "../../../../Models/Post";


export const GET=async (request,{params})=>{
    const {id}=params;


    try{
        await connectDB();
        const post=await Post.findById(id);
        console.log(post)

        return new NextResponse(JSON.stringify(post), { status: 200 })

    } catch(err){
        return new NextResponse("Connection Error",console.log(err) , { status: 500 }) 

    }


}


export const DELETE=async (request,{params})=>{
    const {id}=params;


    try{
        await connectDB();
       await Post.findByIdAndDelete(id);
      

        return new NextResponse("Post Deleted Successfully", { status: 200 })

    } catch(err){
        return new NextResponse("Connection Error",console.log(err) , { status: 500 }) 

    }


}