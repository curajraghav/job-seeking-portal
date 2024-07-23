// Importing Modules
import RecruiterModel from "../models/recruiters.model.js";
import JobsModel from "../models/jobs.model.js";

export default class RecruiterController{
    // Getting register form for the recruiter
    getRegister(req,res){
        res.render('register', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }

    // Posting the data of register form for recruiter on submitting
    postRegister(req,res){
        
        const isRecruiterRegistered = RecruiterModel.isRegistered(req.body.email);
        if(isRecruiterRegistered)
        {
            return res.render('404page',{errorMessage : "This Email Is Already Registered"});
        }
        else
        {
            const {name,email,password} = req.body;
            RecruiterModel.addRecruiter(name,email,password);
            return res.render('login', {userEmail : req.session.userEmail, userName : req.session.userName,}); 
        }
           
    }

    // Getting Login View function here
    getLogin(req,res){
        res.render('login', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }

    // Posting data on login function here
    postLogin(req,res){
        const isRecruiterRegistered = RecruiterModel.isRegistered(req.body.email);
        if(!isRecruiterRegistered)
        {
            return res.render('404page',{errorMessage : "user not found pls register"});
        }

        const {email,password} = req.body;
        const isValidRecruiter = RecruiterModel.isValidRecruiter(email,password);
        if(!isValidRecruiter)
        {
            return res.render('404page',{errorMessage : "invalid credentials"});
        }

        // Creating Sessions Variables Here
        req.session.userEmail = email;
        req.session.userName = RecruiterModel.getName(email);
        const allJobs = JobsModel.getAllJobs();
        res.render('jobs', {allJobs,userEmail : req.session.userEmail, userName : req.session.userName,});
    }

    // Logout function for the recruiter is here
    logout(req,res){
        res.clearCookie('lastVisit');
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else
            {
                res.redirect('/login');
            }
        });
    }
}