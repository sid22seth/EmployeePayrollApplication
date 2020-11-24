let employeePayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
    employeePayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = employeePayrollList.length;
    createInnerHtml();
});
const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList')?JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}
const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    if(employeePayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const employeePayrollData of employeePayrollList){
        innerHtml =`${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profile}"></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDeptHtml(employeePayrollData._department)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${stringifyDate(employeePayrollData._startDate)}</td>
            <td>
                <img name="${employeePayrollData._id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
                <img name="${employeePayrollData._id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#display').innerHTML = innerHtml
}
const createEmployeePayrollJSON = () => {
    let employeePayrollListLocal = [
        {
            _id: new Date().getTime(),
            _name: "Siddhi Seth",
            _salary: "₹ 500000", 
            _gender: "female",
            _department: ["Finance"],
            _notes: "Siddhi is a good employee",
            _profile: "../assets/profile-images/Ellipse -1.png",
            _startDate: "18/09/2020, 12:00:00 AM"
        },
        {
            _id: new Date().getTime() + 1,
            _name: "Aditya Kumar Singh", 
            _salary: "₹ 475000",
            _gender: "male",
            _department: ["Engineer", "HR"],
            _notes: "Good work",
            _profile: "../assets/profile-images/Ellipse -8.png",
            _startDate: "25/09/2020, 12:00:00 AM"
        }
    ];
    return employeePayrollListLocal;
}
const getDeptHtml = (deptList) => {
    let deptHtml = '';
    for(const dept of deptList){
        deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`
    }
    return deptHtml;
}