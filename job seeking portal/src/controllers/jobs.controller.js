// Jobs Model Imported Here
import JobsModel from "../models/jobs.model.js";

export default class JobController{
    // Search Job
    getSearchJobs(req,res){
        const query = req.query.query;
        const filteredJobs = JobsModel.searchJobs(query);
        res.render('searchview',{allJobs:filteredJobs, userEmail : req.session.userEmail, userName : req.session.userName,});
    }

    // Getting jobs on the jobs page
    getJobs(req,res){
        const allJobs = JobsModel.getAllJobs();
        res.render('jobs', {allJobs, userEmail : req.session.userEmail, userName : req.session.userName,});
    }
    
    // getting view for the post new job 
    getPostJob(req,res){
        // res.render('404page');
        res.render('post-new-job', {userEmail : req.session.userEmail, userName : req.session.userName,})
    }

    // Adding new job function here
    postJobs(req,res){
        const {category,designation,location,company,salary,openings,skills,date} = req.body;
        const recruiterEmail = req.session.userEmail;
        JobsModel.addJob(category,designation,location,company,salary,openings,skills,date,recruiterEmail);
        const allJobs = JobsModel.getAllJobs();
        res.render('jobs',{allJobs, userEmail : req.session.userEmail, userName : req.session.userName,});

    }
    

    // Getting view for the particular job page
    getJobPage(req,res){
        // To get the job id here
        const jobId = req.params.jobId;
        const job = JobsModel.getJobById(jobId); 
        if(!job){
            res.status(404).send("Job not found");
        }
        else{
            res.render('job-page', {job,userEmail : req.session.userEmail, userName : req.session.userName,notification:null});
        } 
    }

    // Function to get update view for of the job
    getJobUpdate(req,res){
        // Job id
        const jobId = req.params.jobId;
        const job = JobsModel.getJobById(jobId);
        const recruiterEmail = req.session.userEmail;
        if(!job){
            res.status(404).send("Job not found");
        }
        else if(job.recruiterEmail!==recruiterEmail){
            const notify = "Recruiter Who Posted This Job Is Only Allowed To Update This Job";
            res.render('job-page',{job, userEmail : req.session.userEmail, userName : req.session.userName, notification:notify})
        }
        else{
            res.render('update-job', {job,userEmail : req.session.userEmail, userName : req.session.userName,notification:null});
        }
    }

    // Function to update the job
    postJobUpdate(req,res){
    const jobId = req.params.jobId; 
    const updatedJob = req.body;
    const recruiterEmail = req.session.userEmail;
    
    // Update the job
    const job = JobsModel.getJobById(jobId);
    JobsModel.updateJob(jobId, updatedJob, recruiterEmail); 
    const notify = "Your Job is updated successfully :)"
    res.render('job-page',{job, userEmail : req.session.userEmail, userName : req.session.userName, notification:notify});
    }


    // Function to delete the job
    deleteJob(req, res) {
    const jobId = req.params.jobId;
    const job = JobsModel.getJobById(jobId);

    if (!job) {
            res.status(404).send("Job not found");
        } else {
            const recruiterEmail = req.session.userEmail;
            const error = JobsModel.delete(jobId,recruiterEmail);
            if(error)
            {
                return res.render('404page.ejs',{userEmail : req.session.userEmail, userName : req.session.userName,errorMessage : error});
            }
            var allJobs = JobsModel.getAllJobs();
            res.render('jobs', { allJobs, userEmail: req.session.userEmail, userName: req.session.userName });
        }
    }

}

