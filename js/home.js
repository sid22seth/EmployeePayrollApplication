let empPayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
empPayrollList = getEmployeePayrollDataFromStorage();
document.querySelector(".emp-count").textContent = empPayrollList.length;
createInnerHtml();
localStorage.removeItem('editEmp')
});
const getEmployeePayrollDataFromStorage = () => {
    return localStorage.getItem('EmployeePayrollList')?JSON.parse(localStorage.getItem('EmployeePayrollList')):[];
}
const createInnerHtml = () => {
    const headerHtml = "<tr><th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th></tr>"
    if(empPayrollList.length == 0) return;
    let innerHtml = `${headerHtml}`;
    for(const employeePayrollData of empPayrollList){
        innerHtml =`${innerHtml}
        <tr>
            <td><img class="profile" alt="" src="${employeePayrollData._profile}"></td>
            <td>${employeePayrollData._name}</td>
            <td>${employeePayrollData._gender}</td>
            <td>${getDeptHtml(employeePayrollData._department)}</td>
            <td>${employeePayrollData._salary}</td>
            <td>${stringifyDate(employeePayrollData._startDate)}</td>
            <td>
                <img id="${employeePayrollData._id}" src="../assets/icons/delete-black-18dp.svg" onclick ="remove(this)" alt="delete">
                <img id="${employeePayrollData._id}" alt="edit" onclick="update(this)" src="../assets/icons/create-black-18dp.svg">
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
const remove = (node) => {
    let empPayrollData = empPayrollList.find(empData => empData._id == node.id);
    if(!empPayrollData) return;
    const index = empPayrollList
                    .map(empData => empData._id)
                    .indexOf(empPayrollData._id);
    empPayrollList.splice(index, 1);
    localStorage.setItem("EmployeePayrollList", JSON.stringify(empPayrollList));
    document.querySelector('.emp-count').textContent = empPayrollList.length;
    createInnerHtml();
}
const update = (node) => {
    let empData = empPayrollList.find((emp) => emp._id == node.id);
    if (!empData) return;
    localStorage.setItem("editEmp", JSON.stringify(empData));
    window.location.replace(site_properties.employee_payroll_page);
};