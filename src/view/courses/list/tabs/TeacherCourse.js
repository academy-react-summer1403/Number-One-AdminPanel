import React, { Fragment } from "react";
import ProductsHeader from "../../../../@core/components/items-list/ProductsHeader";
import ListSearchbar from "../../../../@core/components/products-list/ListSearchbar";
import CourseCard from "../CourseCard";
import CustomPagination from "../../../../@core/components/pagination";

const TeacherCourse = () => {
  return (
    <Fragment>
      <ProductsHeader
        rowsFunc={handleRowsOfPage}
        sortOptions={coursesSortOption}
      />
      <ListSearchbar QueryFunction={handleQueryCourse} />
      <CourseCard
        activeView={"grid"}
        item={coursesData?.courseDtos}
        handleActiveOrDetective={activeOrDeActive}
      />
      <CustomPagination
        total={coursesData?.totalCount}
        current={CoursesParams.PageNumber}
        rowsPerPage={CoursesParams.RowsOfPage}
        handleClickFunc={handlePagination}
      />
    </Fragment>
  );
};

export default TeacherCourse;
