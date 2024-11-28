import {
  Book,
  BookOpen,
  Circle,
  Home,
  MessageSquare,
  ShoppingBag,
  ShoppingCart,
  Users,
  Package,
} from "react-feather";

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
        id: "createBlog",
        title: "افزودن اخبار و مقالات",
        icon: <Circle size={20} />,
        navLink: "/createBlog",
      },
    ],
  },
  {
    id: "courseManagement",
    title: "مدیریت دوره ها",
    icon: <BookOpen size={20} />,
    children: [
      {
        id: "courseList",
        title: "لیست دوره ها",
        icon: <Circle size={20} />,
        navLink: "/courses",
      },
      {
        id: "createCourse",
        title: "افزودن دوره جدید",
        icon: <Circle size={20} />,
        navLink: "/createCourse",
      },
    ],
  },
  {
    id: "productsManagement",
    title: "مدیریت محصولات",
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: "productList",
        title: "لیست محصولات",
        icon: <Circle size={12} />,
        navLink: "/products",
      },
      {
        id: "Createproduct",
        title: "افزودن محصول ",
        icon: <Circle size={12} />,
        navLink: "/createProducts",
      },
    ],
  },
  {
    id: "shopPage",
    title: "مدیریت فروشگاه ها",
    icon: <ShoppingBag size={20} />,
    children: [
      {
        id: "shop1Page",
        title: "لیست فروشگاه ها",
        icon: <Circle size={12} />,
        navLink: "/shops",
      },
      {
        id: "shop2Page",
        title: "افزودن فروشگاه ",
        icon: <Circle size={12} />,
        navLink: "/createShop",
      },
    ],
  },
 
  {
    id: "eventManagement",
    title: "مدیریت ایونت ها",
    icon: <Package size={20} />,
    children: [
      {
        id: "eventList",
        title: "لیست ایونت ها",
        icon: <Circle size={12} />,
        navLink: "/events",
      },
      {
        id: "createEvent",
        title: "افزودن ایونت ",
        icon: <Circle size={12} />,
        navLink: "/createEvents",
      },
    ],
  },
  {
    id: "commentsListPage",
    title: "مدیریت کامنت ها",
    icon: <MessageSquare size={20} />,
    navLink: "/comments",
  },
];
