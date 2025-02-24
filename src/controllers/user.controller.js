
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from"../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const registerUser = asyncHandler(async(req,res)=>{

    //get user details from frontend
    //validation of user data
    //check if  user already exists: usrname , emails
    //check for images
    //check of avatar
    //upload them to cloudinary
    //create  user object---create entry in db
    //remove password and refresh token field from response
    // check for user creation
    //return res

    const {fullName, email, username, password}=req.body

    // validation
    if(fullName===""){
        throw new ApiError(400,"fullName is required")
    }

    if([fullName,email,username,password].some((field)=>field?.trim()==="")){
        throw new ApiError(400,"all fields are required")
    }

    // Validate if user already exists or not

    const existedUser=User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"user with same username and email allready exists")
    }

    // avatar and cover images validations
    const avatarLocalPath = req.files?.avatar[0]?.path;

    const coverImageLocalPath=req.files?.coverImage[0]?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required")
    }

    // upload on cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    // validation of avatar and cover image on cloudinary if its uploaded or not
    if(!avatar){
        throw new ApiError(400,"Avatar file is required")
    }

    const user= await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()

    })

    // check for user validation and remove two fields like password and refresh token in  user object
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering new user")
    }

    // lets send the complete response
    return res.status(201).json(

        new ApiResponse(200,createdUser,"User Registered Successfully")
    )


})


export {registerUser}