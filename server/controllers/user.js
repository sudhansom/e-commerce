export const registerUser = async(req, res, next) => {
    try{
        const { name, email, password, address} = req.body;
        console.log(name, email, password, address);
        res.status(201).json({
            message: "check your email and register"
        })
    }catch(error){
        res.json({message: error.message})
    }
}