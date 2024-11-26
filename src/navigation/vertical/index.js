import { Book, Circle, Home, ShoppingCart, Users } from "react-feather";

export default [
  {
    id: "dashboard",
    title: "داشبورد",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "userListPage",
    title: "مدیریت کاربران",
    icon: <Users size={20} />,
    navLink: "/users",
  },
  {
    id: "blogManagement",
    title: "مدیریت اخبار و مقالات",
    icon: <Book size={20} />,
    children: [
      {
        id: "blogList",
        title: "لیست اخبار و مقالات",
        icon: <Circle size={20} />,
        navLink: "/blogs",
      },
      {
        id: "blogList",
        title: "افزودن اخبار و مقالات",
        icon: <Circle size={20} />,
        navLink: "/createBlog",
      },
    ],
  },
  {
    id: "productsPage",
    title: "مدیریت محصولات",
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: "products1Page",
        title: "لیست محصولات",
        icon: <Circle size={12} />,
        navLink: "/products",
      },
      {
        id: "products2Page",
        title: "افزودن محصول ",
        icon: <Circle size={12} />,
        navLink: "/createProducts",
      },
    ],
  },
];
