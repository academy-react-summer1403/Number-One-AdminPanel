// ** React Imports
import { Fragment, lazy } from "react";
import { Navigate } from "react-router-dom";
// ** Layouts
import BlankLayout from "@layouts/BlankLayout";
import VerticalLayout from "@src/layouts/VerticalLayout";
import HorizontalLayout from "@src/layouts/HorizontalLayout";
import LayoutWrapper from "@src/@core/layouts/components/layout-wrapper";

// ** Route Components
import PublicRoute from "@components/routes/PublicRoute";

// ** Utils
import { isObjEmpty } from "@utils";

const getLayout = {
  blank: <BlankLayout />,
  vertical: <VerticalLayout />,
  horizontal: <HorizontalLayout />,
};

// ** Document title
const TemplateTitle = "%s - Vuexy React Admin Template";

// ** Default Route
const DefaultRoute = "/login";

const Home = lazy(() => import("../../pages/Home"));
const SecondPage = lazy(() => import("../../pages/SecondPage"));
const Login = lazy(() => import("../../pages/Login"));
const Register = lazy(() => import("../../pages/Register"));
const ForgotPassword = lazy(() => import("../../pages/ForgotPassword"));
const Error = lazy(() => import("../../pages/Error"));
const Sample = lazy(() => import("../../pages/Sample"));
// User
const Users = lazy(() => import("../../pages/Users"));
const UserDetails = lazy(() => import("../../pages/UserDetails"));
// News
const News = lazy(() => import("../../pages/News"));
const CreateNews = lazy(() => import("../../pages/CreateNews"));
const NewsDetails = lazy(() => import("../../pages/NewsDetails"));
// Courses
const Courses = lazy(() => import("../../pages/Courses"));
const CreateCourses = lazy(() => import("../../pages/CreateCourse"));
const CourseDetails = lazy(() => import("../../pages/CourseDetails"));
// Products
const Products = lazy(() => import("../../pages/Products"));
const CreateProduct = lazy(() => import("../../pages/CreateProduct"));
const ProductsView = lazy(() => import("../../pages/ProductsView"));
// Events
const Events = lazy(() => import("../../pages/Events"));
const CreateEvent = lazy(() => import("../../pages/CreateEvent"));
const EventView = lazy(() => import("../../pages/EventDetails"));

// Shops
const Shops = lazy(() => import("../../pages/Shops"));
const CreateShop = lazy(() => import("../../pages/CreateShop"));
const ShopView = lazy(() => import("../../pages/ShopView"));

// ** Merge Routes
const Routes = [
  {
    path: "/",
    index: true,
    element: <Navigate replace to={DefaultRoute} />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
    access: ["Administrator"],
  },
  {
    path: "/users/view/:id",
    element: <UserDetails />,
    access: ["Administrator"],
  },
  {
    path: "/blogs",
    element: <News />,
    // access: ["Administrator"],
  },
  {
    path: "/createBlog",
    element: <CreateNews />,
    // access: ["Administrator"],
  },
  {
    path: "/blogs/view/:id",
    element: <NewsDetails />,
    // access: ["Administrator"],
  },
  {
    path: "/courses",
    element: <Courses />,
    // access: ["Administrator"],
  },
  {
    path: "/createCourse",
    element: <CreateCourses />,
    // access: ["Administrator"],
  },
  {
    path: "/courses/view/:id",
    element: <CourseDetails />,
    // access: ["Administrator"],
  },
  {
    path: "/products",
    element: <Products />,
    // access: ["Teacher", "Administrator"],
  },
  {
    path: "/product/view/:id",
    element: <ProductsView />,
    // access: ["Teacher", "Administrator"],
  },
  {
    path: "/createProducts",
    element: <CreateProduct />,
    // access: ["Teacher", "Administrator"],
  },
  {
    path: "/shops",
    element: <Shops />,
    // access: ["Teacher", "Administrator"],
  },
  {
    path: "/shops/view/:id",
    element: <ShopView />,
    // access: ["Teacher", "Administrator"],
  },
  {
    path: "/createShop",
    element: <CreateShop />,
    path: "/events",
    element: <Events />,
  },
  {
    path: "/createEvents",
    element: <CreateEvent />,
    // access: ["Teacher", "Administrator"],
  },
  {
    path: "/events/view/:id",
    element: <EventView />,
    // access: ["Teacher", "Administrator"],
  },
  {
    path: "/sample",
    element: <Sample />,
  },
  {
    path: "/second-page",
    element: <SecondPage />,
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/register",
    element: <Register />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "/error",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
  {
    path: "*",
    element: <Error />,
    meta: {
      layout: "blank",
    },
  },
];

const getRouteMeta = (route) => {
  if (isObjEmpty(route.element.props)) {
    if (route.meta) {
      return { routeMeta: route.meta };
    } else {
      return {};
    }
  }
};

// ** Return Filtered Array of Routes & Paths
const MergeLayoutRoutes = (layout, defaultLayout) => {
  const LayoutRoutes = [];

  if (Routes) {
    Routes.filter((route) => {
      let isBlank = false;
      // ** Checks if Route layout or Default layout matches current layout
      if (
        (route.meta && route.meta.layout && route.meta.layout === layout) ||
        ((route.meta === undefined || route.meta.layout === undefined) &&
          defaultLayout === layout)
      ) {
        const RouteTag = PublicRoute;

        // ** Check for public or private route
        if (route.meta) {
          route.meta.layout === "blank" ? (isBlank = true) : (isBlank = false);
        }
        if (route.element) {
          const Wrapper =
            // eslint-disable-next-line multiline-ternary
            isObjEmpty(route.element.props) && isBlank === false
              ? // eslint-disable-next-line multiline-ternary
                LayoutWrapper
              : Fragment;

          route.element = (
            <Wrapper {...(isBlank === false ? getRouteMeta(route) : {})}>
              <RouteTag route={route}>{route.element}</RouteTag>
            </Wrapper>
          );
        }

        // Push route to LayoutRoutes
        LayoutRoutes.push(route);
      }
      return LayoutRoutes;
    });
  }
  return LayoutRoutes;
};

const getRoutes = (layout) => {
  const defaultLayout = layout || "vertical";
  const layouts = ["vertical", "horizontal", "blank"];

  const AllRoutes = [];

  layouts.forEach((layoutItem) => {
    const LayoutRoutes = MergeLayoutRoutes(layoutItem, defaultLayout);

    AllRoutes.push({
      path: "/",
      element: getLayout[layoutItem] || getLayout[defaultLayout],
      children: LayoutRoutes,
    });
  });
  return AllRoutes;
};

export { DefaultRoute, TemplateTitle, Routes, getRoutes };
