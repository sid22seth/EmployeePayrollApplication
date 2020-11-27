class EmployeePayrollData
{
    id;
    get name(){
        return this._name;
    }
    set name(name){
        let nameRegex =RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
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
    set startDate(startDate) {
        let now = new Date();
        if (startDate > now) 
            throw 'Start Date is a Future Date';
        var diff = Math.abs(now.getTime() - startDate.getTime());
        if (diff / (1000 * 60 * 60 * 24) > 30)
            throw 'Start Date is beyond 30 days';
        this._startDate = startDate;
    }
    get note(){
        return this._note;
    }
    set note(note){
        this._note = note;
    }
    toString(){
        return  "Id = " + this._id + ",Name = "+this._name+", Salary = "+this._salary+" ,Gender = "+this._gender+ " ,Startdate = " + this._startDate + " ,Department = "+this._department+" ,Profile = "+this._profile+" ,Note = " + this._note;
    }
}