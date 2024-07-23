    import JobsModel from "./jobs.model.js";
    
    // Function for getting an applicant by their id
    export default class UserModel{
        // Function to get applicant by it's id
    static getApplicantById(jobId, applicantId) {
        const job = JobsModel.getJobById();
        if (!job || !job.applicants) {
            return null;
        }
        return job.applicants.find((applicant) => applicant.id == applicantId);
    }
    
        // Function for getting an applicant by their email
        static getApplicantByEmail(jobId, email) {
            const job = JobsModel.getJobById(jobId);
            console.log(job);
            if (job && job.applicants) {
                return job.applicants.find((applicant) => applicant.email === email);
            }
            return null;
        }
        
        // Adding applicants application for a particular job by it's id
        static addJobApplicants(id, name, email, contact, resume) {
            const job = JobsModel.getJobById(id);
        
            if (!job) {
                // Handling the case where the job with the given id is not found
                console.error(`Job with id ${id} not found.`);
                return;
            }
        
            if (!job.applicants) {
                // If the 'applicants' array is not defined, then creating
                job.applicants = [];
            }
        
            const applicantId = job.applicants.length + 1; // Generating a unique applicant ID
            job.applicants.push({ id: applicantId, name, email, contact, resume }); 
        }        

    }