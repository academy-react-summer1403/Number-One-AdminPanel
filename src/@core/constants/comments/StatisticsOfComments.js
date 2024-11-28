import { Check, Send, X } from "react-feather";

const StatisticsOfComments = (data) => {
    const approvedComments = data?.comments?.filter(
      (item) => item.accept === true
    );
    const unverifiedComments = data?.comments?.filter(
      (item) => item.accept === false
    );
    const CommentSummaryData = [
      {
        title: "مجموع کامنت ها",
        color: "primary",
        icon: Send,
        renderStats: data?.totalCount,
      },
      {
        title: "کامنت های تایید شده",
        color: "success",
        icon: Check,
        renderStats: approvedComments?.length,
      },
      {
        title: "کامنت های تایید نشده",
        color: "warning",
        icon: X,
        renderStats: unverifiedComments?.length,
      },
    ];
    return CommentSummaryData;
  };

  export default StatisticsOfComments