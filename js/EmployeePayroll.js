let isUpdate = false;
let employeePayrollObj = {};
window.addEventListener('DOMContentLoaded',(event) => {
    const name = document.querySelector('#name');
    name.addEventListener('input', function () {
        if (name.value.length == 0) {
            setTextValue('.text-error', "");
            return;
        }
        try {
            checkName(name.value);
            setTextValue('.text-error', "");
        } 
        catch (e) {
            setTextValue('.text-error', e);
        }
    });
    const date = document.querySelector('#date');
    date.addEventListener('input', function () 
    {
        let startDate = getInputValueById('#day') + " " + getInputValueById('#month') + " " + getInputValueById('#year');
        try 
        {
            checkStartDate(new Date(Date.parse(startDate)));
            setTextValue('.date-error', " ");
        } 
        catch (e) 
        {
            setTextValue('.date-error', e);
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input',function(){
    output.textContent = salary.value;
    });
    checkForUpdate();
});

function save(event){
    event.preventDefault();
    event.stopPropagation();
    try{    
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page)
    }
    catch(e)
    {
        return;
    }
}
function createAndUpdateStorage(){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if (employeePayrollList) 
    {
        let employeeData = employeePayrollList.find(empData => empData.id == employeePayrollObj.id);
        if (!employeeData) 
        {
            employeePayrollList.push(employeePayrollObj);
        }
        else 
        {
            const index = employeePayrollList.map(empData => empData.id)
                .indexOf(employeeData.id);
            employeePayrollList.splice(index, 1, employeePayrollObj);
        }
    } 
    else 
    {
        employeePayrollList = [employeePayrollObj];
    }
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));
    alert(JSON.stringify(employeePayrollObj).toString());
}
const setEmployeePayrollObject = () => {
    if(!isUpdate && site_properties.use_local_storage.match("true"))
    {
        employeePayrollObj.id = createNewEmployeeId();
    }
    let name = document.querySelector('#name');
    try 
    {
        checkName(name.value);
        employeePayrollObj._name = name.value;
        setTextValue('.text-error', "");
    } 
    catch (e) 
    {
        setTextValue('.text-error', e);
        throw e;
    }
    employeePayrollObj._profile = getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
    employeePayrollObj._department = getSelectedValues('[name=department]');
    employeePayrollObj._salary = getInputValueById('#salary');
    employeePayrollObj._note = getInputValueById('#notes');
    let date = getInputValueById('#year') + " "+ getInputValueById('#month') + " " + getInputValueById('#day');
    try 
    {
        checkStartDate(new Date(Date.parse(date)));
        employeePayrollObj._startDate = new Date(date);
        setTextValue('.date-error', " ");
    } 
    catch (e) 
    {
        setTextValue('.date-error', e);
        throw e;
    }
}

const createNewEmployeeId = () => {
    let empId = localStorage.getItem("EmployeeID");
    empId = !empId ? 1 : (parseInt(empId) + 1).toString();
    localStorage.setItem("EmployeeID", empId);
    return empId;
}
const setForm = () => {
    setValue('#name', employeePayrollObj._name);
    setSelectedValues('[name=profile]', employeePayrollObj._profile);
    setSelectedValues('[name=gender]', employeePayrollObj._gender);
    setSelectedValues('[name=department]', employeePayrollObj._department);
    setValue('#salary', employeePayrollObj._salary);
    setTextValue('.salary-output', employeePayrollObj._salary);
    setValue('#notes', employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day', date[0])
    setValue('#month', date[1])
    setValue('#year', date[2]);
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        if (Array.isArray(value)) {
            if (value.includes(item.value)) {
                item.checked = true;
            }
        }
        else if (item.value == value)
            item.checked = true;
    });
}
const resetForm = () => {
    setValue('#name',''); 
    unsetSelectedValues('[name=profile]'); 
    unsetSelectedValues('[name=gender]'); 
    unsetSelectedValues('[name=department]'); 
    setValue('#salary', ' '); 
    setValue('#notes',' ');
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0); 
}
const setSelectedIndex = (id, index) => {
    const element = document.querySelector(id);
    element.selectedIndex = index;
}
const setTextValue = (id, value) => {
    const element = document.querySelector(id);
    element.textContent = value;
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}
const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked = false;
    });
}
function getSelectedValues(propertyValue)
{
    let allItems = document.querySelectorAll(propertyValue);
    let selItems = [];
    allItems.forEach(item => {
        if(item.checked)
        selItems.push(item.value);
    });
    return selItems;
}
function getInputValueById(id){
    let value = document.querySelector(id).value;
    return value;
}
function getElementValueById(id){
    let value = document.getElementById(id).value
    return value;
}
const checkForUpdate = () => {
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson ? true : false;
    if (!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}