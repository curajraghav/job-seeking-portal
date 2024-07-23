export default class RecruiterModel{
    // Constructor
    constructor(id,name,email,password)
    {
        this.id = id;
        this.name = name,
        this.email = email,
        this.password = password
    }

    // Adding Recruiter
    static addRecruiter(name,email,password)
    {
        const newRecruiter = new RecruiterModel(
            recruiters.length+1,
            name,
            email,
            password,
        )
        recruiters.push(newRecruiter);
    }

    // Checking isRegistered
    static isRegistered(email)
    {
       return recruiters.find((user)=>{
            return user.email === email;
        });
    }

    // Validating Recruiter
    static isValidRecruiter(email,password)
    {
        return recruiters.find((user)=>{
           return user.email === email && user.password === password;
        });
    }

    // Getting name
    static getName(email)
    {
        const recruiter = recruiters.find((user)=> user.email === email);
        if(recruiter)
        {
            return recruiter.name;
        }
        else
        {
            return null;
        }
    }
}

const recruiters = [];