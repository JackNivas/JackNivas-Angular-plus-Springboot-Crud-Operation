package com.AngBoot.Curd.CustomerService;




import java.util.List;

import com.AngBoot.Curd.DTO.CustomerDTO;
import com.AngBoot.Curd.DTO.CustomerSaveDTO;
import com.AngBoot.Curd.DTO.CustomerUpdateDTO;

public interface CustomerService {
    String addCustomer(CustomerSaveDTO customerSaveDTO);

    List<CustomerDTO> getAllCustomer();

    String updateCustomers(CustomerUpdateDTO customerUpdateDTO);

    boolean deleteCustomer(int id);
}