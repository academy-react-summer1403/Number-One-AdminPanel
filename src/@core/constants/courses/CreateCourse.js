export const FirstLevelFields = [
    {id:1,label:"نام دوره",value:"Title"},
    {id:2,label:"عنوان گوگل",value:"GoogleTitle"},
    {id:3,label:"ظرفیت دوره",value:"Capacity"},
    {id:4,label:"قیمت دوره",value:"Cost"},

]

export const secondLevelFields = [
    {id:1,label:"نحوه برگزاری",value:"CourseTypeId",array:"courseTypeDtos",key:"id",keySelect:"typeName"},
    {id:2,label:"کلاس برگزاری",value:"ClassId",array:"classRoomDtos",key:"id",keySelect:"classRoomName"},
    {id:3,label:"مدرس دوره",value:"TeacherId",array:"teachers",key:"teacherId",keySelect:"fullName"},
    {id:4,label:"سطح دوره",value:"CourseLvlId",array:"courseLevelDtos",key:"id",keySelect:"levelName"},
    {id:5,label:"ترم",value:"TremId",array:"termDtos",key:"id",keySelect:"termName"},
]