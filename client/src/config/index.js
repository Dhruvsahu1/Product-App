export const registerFormControls = [
    {
      name: "userName",
      label: "Username",
      placeholder: "Enter your username",
      type: "text",
      componentType: "input",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      componentType: "input",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      componentType: "input",
    },
  ];
  
  export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      type: "email",
      componentType: "input",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      type: "password",
      componentType: "input",
    },
  ];

  export const addProductFormElements = [
    {
      label:"Title",
      name: "title",
      componentType:"input",
      type: "text",
      placeholder: "Enter the title of the product",
    },
    {
      label:"Description",
      name: "description",
      componentType:"textarea",
      placeholder: "Enter the description of the product",
    },
    {
      label:"Category",
      name: "category",
      componentType:"select",
      options: [
        {
          id: "men",label:"Men"
        },
        {
          id: "women",label:"Women"
        },
        {
          id: "kids",label:"Kids"
        },
        {
          id: "accessories",label:"Accessories" 
        },
        {
          id: "footwear",label:"Footwear" 
        }
      ],
    },
    {
      label:"Brand",
      name: "brand",
      componentType:"select",
      options: [
        {
          id: "nike",label:"Nike"
        },
        {
          id: "adidas",label:"Adidas"
        },
        {
          id: "puma",label:"Puma"
        },
        {
          id: "reebok",label:"Reebok"
        },
        {
          id:"levis",label:"Levis"
        },
        {
          id:"zara",label:"Zara"
        },
        {
          id:"hm",label:"H&M"
        }
      ],
    },{
      label:"Price",
      name: "price",
      componentType:"input",
      type: "number",
      placeholder: "Enter the price of the product",
    },
    {
      label:"Sale Price",
      name: "salePrice",
      componentType:"input",
      type: "number",

    },{
      label:"Total Stock",
      name: "totalStock",
      componentType:"input",
      type: "number",
      placeholder: "Enter the total stock of the product",
    }
  ];