import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';
import { Employee } from 'src/app/models/employee';

declare var M: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  constructor(public employeeService: EmployeeService) {}

  ngOnInit() {
    this.getEmployees();
  }

  addEmployee(form: NgForm) {
    if (form.value._id) {
      this.employeeService.putEmployee(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'updated successfuly' });
        this.getEmployees();
      });
    } else {
      this.employeeService.postEmployee(form.value).subscribe(res => {
        this.resetForm(form);
        M.toast({ html: 'saved successfuly' });
        this.getEmployees();
      });
    }
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employeeService.employees = res as Employee[];
      console.log(res);
    });
  }

  editEmployee(employee: Employee) {
    this.employeeService.selectedEmployee = employee;
    // this.employeeService.putEmployee(employee)
  }

  deleteEmployee(_id: string) {
    if (confirm('are you sure you want to delete')) {
      this.employeeService.deleteEmployee(_id).subscribe(res => {
        this.getEmployees();
        M.toast({html: 'deleted succesfully'});
      });
    }
  }
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.employeeService.selectedEmployee = new Employee();
    }
  }
}
