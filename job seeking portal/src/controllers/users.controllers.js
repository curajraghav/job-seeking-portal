// Importing Modules
import UserModel from '../models/users.model.js';
import JobsModel from '../models/jobs.model.js';
import path from 'path';
import sendMail from '../../middlewares/mailsend.middleware.js';


export default class UserController{
    // Rendering home
    getHome(req,res){
        res.render('index.ejs', {userEmail : req.session.userEmail, userName : req.session.userName,});
    }


    // Function to post data after applying any job by applicant here
    postApplyJob(req, res) {
    const { name, email, contact } = req.body;
    const resume = 'applicants/' + req.file.filename;
    const jobId = req.params.jobId;

    // Check if the job exists
    if (!jobId) {
        return res.status(404).send('Job is not found here');
    } else {
        // Checking if the applicant has already applied for this job
        const alreadyApplied = UserModel.getApplicantByEmail(jobId, email);
        if (alreadyApplied) {
            const notify = "You, have already applied for this job.";
            const job = JobsModel.getJobById(jobId);
            return res.render('job-page',{job, userEmail: req.session.userEmail, userName: req.session.userName, notification: notify});
        } else {
            UserModel.addJobApplicants(jobId, name, email, contact, resume);
            // Email send
            sendMail(name,email);
            const notify = "Application submitted successfully you will get a email soon :)";
            const job = JobsModel.getJobById(jobId);
            return res.render('job-page', {job, userEmail: req.session.userEmail, userName: req.session.userName, notification: notify});
        }
    }
}

    // Getting the applicants for a particular job if he applied for this job here
    getApplicants(req,res){
        const jobId = req.params.jobId;
        const job = JobsModel.getJobById(jobId);
        const recruiterEmail = req.session.userEmail;
        if (!job) {
            res.status(404).send("Job is not found here");
            return;
        }
        
        if (job.recruiterEmail !== recruiterEmail) {
            const notify = "Recruiter Who Posted This Job Is Only Allowed To Access Applicants";
            res.render('job-page', { job, userEmail: req.session.userEmail, userName: req.session.userName, notification: notify });
        } else {
            res.render('applicants', { job, userEmail: req.session.userEmail, userName: req.session.userName });
        }
        
    }

    // Showing the applicant resume on clicking view Resume
    getApplicantResume(req, res) {
    const applicantEmail = req.params.applicantEmail;
    const jobId = req.params.jobId;
    const applicant = UserModel.getApplicantByEmail(jobId, applicantEmail);
  
    if (!applicant) {
      res.status(404).send('Applicant not found');
    } else {
      const resumeFileName = applicant.resume;
      const resumeFilePath = path.join(path.resolve(), './public', resumeFileName);
      res.sendFile(resumeFilePath);
    }
}
  

}