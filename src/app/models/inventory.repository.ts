import { Injectable } from "@angular/core";
import { Inventory } from "./inventory.model";
import { RestDataSource } from "./rest.datasource";
import { ResponseModel } from "./response.model";

@Injectable()
export class InventoryRepository {

    private inventory: Inventory[] = [];
    listReady: boolean = false;

    constructor(private dataSource: RestDataSource) {}

    getInventory(): Inventory[] {        
        return this.inventory;
    }

    setInventory(){
        this.listReady = false;
        this.dataSource.getInventoryList().subscribe(data => {
            this.inventory = data;
            this.listReady = true;
        });
    }

    getItem(id: string): Inventory {
        return Object.assign({}, this.inventory.find(i => i._id === id)!);      
        // return (this.inventory.find(i => i._id === id)!);        
    }

    async saveInventory(item: Inventory) {

        // If it does not have id, then create a new item.
        if (item._id == null || item._id == "") {
            this.dataSource.insertInventory(item)
                .subscribe(response => {
                    if(response._id) // If API created
                    {
                        this.inventory.push(response);
                    }
                    else{ // If API send error.
                        // Convert into ResponseModel to get the error message.
                        let error = response as ResponseModel;  
                        alert(`Error: ${error.message}`);
                    }
                });
        } else {
            // If it has id, then update a existing item.
            this.dataSource.updateInventory(item).subscribe(resp => {

                // Convert into ResponseModel to get the error message.
                let response = resp as ResponseModel;
                if (response.success == true) {
                    console.log(`Sucess: ${response.success}`);
                    this.inventory.splice(this.inventory.
                        findIndex(i => i._id == item._id), 1, item);
                }
                else{
                    // If API send error.
                    alert(`Error: ${response.message}`);
                }        
            });
        }
    }

    deleteInventory(id: string) {
        this.dataSource.deleteInventory(id).subscribe(response => {
            if (response.success) {
                this.inventory.splice(this.inventory.
                    findIndex(item => item._id == id), 1);                                
            }
            else{
                alert(`Error: ${response.message}`);
            }
        })
    }

}