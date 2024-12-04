import http from "../../interceptor"

const GetCourseTeacher = async () => {
try {
    const response = await http.get("/Course/TeacherCourseList")
    return response
} catch (error) {
    return []
}
}

export default GetCourseTeacher