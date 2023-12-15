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
      actionName: 'Products'
    },
    {
      actionLink: 'brands',
      actionName: 'Brands'
    },
    {
      actionLink: 'types',
      actionName: 'Types'
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
      actionName: 'Stock'
    },

  ]
};

export const systemButtonConfig: ButtonConfig = {
  identity: "SYSTEM",
  displayValue: 'System',
  routeLink: 'inventory', // Assuming 'inventory' is the correct route
  childrenActions: [
    {
      actionLink: 'logs',
      actionName: 'Logs'
    },
    {
      actionLink: 'shipments',
      actionName: 'Shipments'
    }

  ]
};

export const locationButtonConfig: ButtonConfig = {
  identity: "LOCATION",
  displayValue: 'Locations',
  routeLink: '',
  childrenActions: [
    {
      actionLink: 'locations',
      actionName: 'Manage'
    },

  ]
};

export const shipmentButtonConfig: ButtonConfig = {
  identity: "SHIPMENT",
  displayValue: 'Shipments',
  routeLink: 'shipments',
};
