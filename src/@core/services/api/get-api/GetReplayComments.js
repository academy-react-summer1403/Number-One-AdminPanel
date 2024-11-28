const GetReplayComments = async (Ids) => {
  // console.log(Ids)
  if (Ids.courseId !== null && Ids.commentId !== null) {
    try {
      const result = await http.get(
        `/Course/GetCourseReplyCommnets/${Ids.courseId}/${Ids.commentId}`
      );
      return result;
    } catch (error) {
      console.log(error);
      return [];
    }
  } else {
    // console.log("courseId or commentId is null");
    return [];
  }
};

export default GetReplayComments;
