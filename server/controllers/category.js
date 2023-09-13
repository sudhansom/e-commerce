import Category from "../models/category.js";
import slugify from "slugify";


export const createCategory = async(req, res)=>{
    try{
        const { name } = req.body;
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(400).json({error: "Category already exists with this name"});
        }
        const category = new Category({
            name,
            slug: slugify(name), // cloth man ---> cloth-man
        })

        await category.save();

        return res.status(200).json({message: 'category created....'});
    }catch(err){
        return res.json({error: error.message});
    }
}


export const updateCategory = async(req, res)=>{
    try{
        const { name } = req.body;
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(400).json({error: "Category already exists with this name"});
        }
        const category = new Category({
            name,
            slug: slugify(name), // cloth man ---> cloth-man
        })

        await category.save();

        return res.status(200).json({message: 'category created....'});
    }catch(err){
        return res.json({error: error.message});
    }
}

export const deleteCategory = async(req, res)=>{
    try{
        const { name } = req.body;
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(400).json({error: "Category already exists with this name"});
        }
        const category = new Category({
            name,
            slug: slugify(name), // cloth man ---> cloth-man
        })

        await category.save();

        return res.status(200).json({message: 'category created....'});
    }catch(err){
        return res.json({error: error.message});
    }
}

export const getCategory = async(req, res)=>{
    try{
        const { slug } = req.params;
        const singleCategory = await Category.findOne({ slug });
        if(!singleCategory){
            return res.status(400).json({error: "no Category found.."});
        }
        return res.status(200).json(singleCategory);
    }catch(err){
        return res.json({error: err.message});
    }
}

export const getCategories = async(req, res)=>{
    try{
        const categories = await Category.find();
        if(!categories.length){
            return res.status(400).json({error: "no Category found.."});
        }
        return res.status(200).json({categories: categories});
    }catch(err){
        return res.json({error: error.message});
    }
}