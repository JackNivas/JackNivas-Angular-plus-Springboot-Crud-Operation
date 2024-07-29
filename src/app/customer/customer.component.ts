import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class CustomerComponent {

  CustomerArray: any[] = [];
  isResultLoaded = false;
  isUpdateFormActive = false;
  
  customername: string = "";
  customeraddress: string = "";
  mobile: number = 0;
  currentCustomerID = "";

  constructor(private http: HttpClient) {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.http.get("http://localhost:8082/api/v1/customer/getAllCustomer")
      .subscribe((resultData: any) => {
        this.isResultLoaded = true;
        console.log(resultData);
        this.CustomerArray = resultData;
      });
  }

  register() {
    let bodyData = {
      "customername": this.customername,
      "customeraddress": this.customeraddress,
      "mobile": this.mobile
    };

    this.http.post("http://localhost:8082/api/v1/customer/save", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllCustomer();
      alert("Customer Registered Successfully");
      this.customername = '';
      this.customeraddress = '';
      this.mobile = 0;
    });
  }

  setUpdate(data: any) {
    this.customername = data.customername;
    this.customeraddress = data.customeraddress;
    this.mobile = data.mobile;
    this.currentCustomerID = data.customerid;
  }

  UpdateRecords() {
    let bodyData = {
      "customerid": this.currentCustomerID,
      "customername": this.customername,
      "customeraddress": this.customeraddress,
      "mobile": this.mobile
    };

    this.http.put("http://localhost:8082/api/v1/customer/update", bodyData, { responseType: 'text' }).subscribe((resultData: any) => {
      console.log(resultData);
      this.getAllCustomer();
      alert("Customer Registered Updated");
      this.customername = '';
      this.customeraddress = '';
      this.mobile = 0;
    });
  }

  save() {
    if (this.currentCustomerID == '') {
      this.register();
    } else {
      this.UpdateRecords();
    }
  }

  setDelete(data: any) {
    const confirmed = window.confirm('Are you sure you want to delete this customer?');
  
    if (confirmed) {
      this.http.delete(`http://localhost:8082/api/v1/customer/deletecustomer/${data.customerid}`, { responseType: 'text' })
        .subscribe((resultData: any) => {
          console.log(resultData);
          alert('Customer Deleted');
          this.getAllCustomer();
  
          // Reset form fields
          this.customername = '';
          this.customeraddress = '';
          this.mobile = 0;
        }, (error) => {
          console.error('Error deleting customer:', error);
          alert('Failed to delete customer');
        });
    } else {
      console.log('Delete operation canceled');
    }
  }
  
}
