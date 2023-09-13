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