// Middleware to verify that Recruiter is accessing the post job or anyone else
export const auth = (req,res,next)=>{
    if(req.session.userEmail)
    {
        next();
    }
    else
    {
        res.render('404page',{errorMessage : "only recruiter is allowed to access this page, login as recruiter to continue"});
    }
}