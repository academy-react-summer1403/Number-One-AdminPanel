import { setAcceptComment, setSortCal, setSortType } from "../../../view/comments/store/CommentsList";

const FilterCommentsArray = [
  {
    options: [
      { value: true, label: "تایید شده" },
      { value: false, label: "تایید نشده" },
    ],
    setState: setAcceptComment,
    label: "وضعیت کامنت",
    variant: "Accept",
  },
  {
    options: [{ value: "replyCount", label: "تعداد ریپلای" }],
    setState: setSortCal,
    label: "براساس",
    variant: "SortingCol",
  },
  {
    options: [
      { value: "ASC", label: "صعودی" },
      { value: "DESC", label: "نزولی" },
    ],
    setState: setSortType,
    label: "نوع مرتب سازی",
    variant: "SortType",
  },
];

export default FilterCommentsArray;
