class EmployeePayrollData
{
    get id(){
        return this._id;
    }
    set id(id){
        this._id = id;
    }
    get name(){
        return this._name;
    }
    set name(name){
        let nameRegex =RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if(nameRegex.test(name))
        this._name = name;
        else {
        throw "Name is Incorrect!! " + name;
       }    
    }
    get profile(){
        return this._profile;
    }
    set profile(profile){
        this._profile = profile;
    }
    get gender(){
        return this._gender;
    }
    set gender(gender){
        this._gender = gender;
    }
    get department(){
        return this._department;
    }
    set department(department){
        this._department = department;
    }
    get salary(){
        return this._salary;
    }
    set salary(salary){
        this._salary = salary;
    }
    
    get startDate(){
        return this._startDate;
    }
    set startDate(startDate){
        if(startDate<=new Date())
        this._startDate = startDate.toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
        else
        {  
            throw "Invalid Start date "+startDate;
        }    
    }
    get note(){
        return this._notes;
    }
    set note(notes){
        this._note = notes;
    }
    toString(){
        return  "Id = " + this._id + ",Name = "+this._name+", Salary = "+this._salary+" ,Gender = "+this._gender+ " ,Startdate = " + this._startDate + " ,Department = "+this._department+" ,Profile = "+this._profile+" ,Note = " + this._note;
    }
}