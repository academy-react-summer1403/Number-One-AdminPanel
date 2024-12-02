import {
  Mail,
  Home,
  Users,
  Book,
  Circle,
  BookOpen,
  MessageSquare,
  ShoppingCart,
  ShoppingBag,
  Package,
} from "react-feather";

export default [
  {
    id: "home",
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
      {
        id: "blogCategories",
        title: "مدیریت دسته بندی اخبار ",
        icon: <Circle size={20} />,
        navLink: "/blogCategories",
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
      {
        id: "courseTechnologiesList",
        title: "مدیریت تکنولوژی دوره ها",
        icon: <Circle size={20} />,
        navLink: "/courseTechnologies",
      },
      {
        id: "courseStatus",
        title: "مدیریت وضعیت دوره ها",
        icon: <Circle size={20} />,
        navLink: "/courseStatus",
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
      {
        id: "shopCategories",
        title: "مدیریت دسته بندی فروشگاه",
        icon: <Circle size={12} />,
        navLink: "/shopCategories",
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
