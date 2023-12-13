import {ButtonConfig} from "../services/HelperSevices/dashboard-communication.service";

export const usersButtonConfig: ButtonConfig = {
  identity: "USERS",
  displayValue: 'Users',
  routeLink: 'userManagement'
};

export const productsButtonConfig: ButtonConfig = {
  identity: "PRODUCTS",
  displayValue: 'Products',
  routeLink: 'products', // Assuming 'products' is the correct route
  childrenActions: [
    {
      actionLink: 'products',
      actionName: 'Manage'
    },
    {
      actionLink: 'banProducts',
      actionName: 'Ban'
    }
  ]
};

export const inventoryButtonConfig: ButtonConfig = {
  identity: "INVENTORY",
  displayValue: 'Inventory',
  routeLink: 'inventory', // Assuming 'inventory' is the correct route
  childrenActions: [
    {
      actionLink: 'inventory',
      actionName: 'Manage'
    },
    {
      actionLink: 'reviewInventory',
      actionName: 'Review'
    },
    {
      actionLink: 'auditInventory',
      actionName: 'Audit'
    }
  ]
};
