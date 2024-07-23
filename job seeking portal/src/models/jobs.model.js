export default class JobsModel {
  //Constructor
  constructor(
    id,
    category,
    designation,
    location,
    company,
    salary,
    openings,
    skills,
    date,
    postedTime,
    recruiterEmail,
    applicants
  ) {
    (this.id = id),
      (this.category = category),
      (this.designation = designation),
      (this.location = location),
      (this.company = company),
      (this.salary = salary),
      (this.openings = openings),
      (this.skills = skills),
      (this.date = date),
      (this.postedTime = postedTime),
      (this.recruiterEmail = recruiterEmail),
      (this.applicants = applicants || []);
  }

  //Function to add a new job
  static addJob(
    category,
    designation,
    location,
    company,
    salary,
    openings,
    skills,
    date,
    recruiterEmail
  ) {
    const newJob = new JobsModel(
      jobs.length + 1,
      category,
      designation,
      location,
      company,
      salary,
      openings,
      skills,
      date,
      new Date().toUTCString(),
      recruiterEmail
    );
    jobs.push(newJob);
  }

  //Function to get all jobs
  static getAllJobs() {
    return jobs;
  }

  // Function for getting a job by its id
  static getJobById(id) {
    return jobs.find((job) => job.id == id);
  }

  // Function to update the job
  static updateJob(jobId, updatedJob, recruiterEmail) {
    const index = jobs.findIndex((j) => j.id == jobId); // Find the job using jobId
    const job = this.getJobById(jobId);
    const applicants = job.applicants;
    if (index !== -1) {
      // If job is found
      updatedJob.id = jobId;
      updatedJob.postedTime = Date.now();
      updatedJob.applicants = applicants;
      updatedJob.recruiterEmail = recruiterEmail;
      jobs[index] = updatedJob; // Update the job
    } else {
      return "Job not found";
    }
  }

  // Function to delete the job
  static delete(id, recruiterEmail) {
    const job = this.getJobById(id);
    if (job.recruiterEmail == recruiterEmail) {
      const index = jobs.findIndex((j) => j.id == id);
      jobs.splice(index, 1);
    } else {
      return "Recruiter Who Posted This Job Is Only Allowed To Delete This Job";
    }
  }

  // Search Jobs
  static searchJobs(query) {
    query = query.toLowerCase();
    const allJobs = this.getAllJobs();
    const filteredJobs = allJobs.filter((job) => {
      return job.designation.toLowerCase().includes(query);
    });
    return filteredJobs;
  }
}

const jobs = [];

// Adding some demo jobs with more skills
JobsModel.addJob(
  "IT",
  "Software Engineer",
  "Remote",
  "TechCorp",
  "100000",
  5,
  ["JavaScript", "React", "Node.js", "HTML", "CSS"],
  "2024-01-25",
  "recruiter@example.com"
);
JobsModel.addJob(
  "Finance",
  "Financial Analyst",
  "New York",
  "FinanceWorld",
  "80000",
  3,
  ["Finance", "Excel", "Data Analysis"],
  "2024-01-26",
  "recruiter@example.com"
);
JobsModel.addJob(
  "Marketing",
  "Marketing Manager",
  "San Francisco",
  "AdvertiseCo",
  "90000",
  2,
  ["Marketing", "Social Media", "SEO"],
  "2024-01-27",
  "recruiter@example.com"
);
JobsModel.addJob(
  "Engineering",
  "Mechanical Engineer",
  "Los Angeles",
  "MegaMachines",
  "120000",
  4,
  ["Mechanical Engineering", "CAD", "AutoCAD"],
  "2024-01-28",
  "recruiter@example.com"
);
JobsModel.addJob(
  "Healthcare",
  "Registered Nurse",
  "Chicago",
  "CareHospital",
  "75000",
  6,
  ["Nursing", "Patient Care", "BLS Certification"],
  "2024-01-29",
  "recruiter@example.com"
);
JobsModel.addJob(
  "IT",
  "MERN Developer",
  "Remote",
  "TechHub",
  "110000",
  3,
  ["MongoDB", "Express.js", "React", "Node.js", "RESTful APIs"],
  "2024-01-30",
  "recruiter@example.com"
);
