// ** Third Party Components
import { PolarArea } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';


// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
} from 'reactstrap'
import { useQueryWithDependencies } from '../../utility/hooks/useCustomQuery';
import { GetUserList } from '../../@core/services/api/get-api';
import { userRolesInfo } from '../../@core/constants/user';

Chart.register(...registerables); 

const ChartjsPolarAreaChart = props => {
  // ** Props
  const { primary, greyColor, labelColor, infoColorShade, warningColorShade, successColorShade } = props
  const { data: usersData } = useQueryWithDependencies(
    "GET_USERS_DATA",
    GetUserList,
    null,
    { PageNumber: 1, RowsOfPage: 1000 }
  );
  const allUsersNum =usersData?.listUser?.length
  // Obtaining the number of comments of course categories and adding to the presentation
  let RolesArray = [];
  for (let element of userRolesInfo) {
    const usersLength = usersData?.listUser?.filter(
      (item) => item?.userRoles?.includes(element)
    );
    RolesArray.push(Math.round((usersLength?.length/allUsersNum)*100));

  }
  const otherUsers = RolesArray?.slice(5,9)?.reduce((accumulator, currentValue) => accumulator + currentValue)
  let usersRolesPercentArray = RolesArray.slice(0,4).concat(otherUsers)

  // ** Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 500 },
    layout: {
      padding: {
        top: -5,
        bottom: -45
      }
    },
    scales: {
      r: {
        grid: { display: false },
        ticks: { display: false }
      }
    },
    plugins: {
      legend: {
        position: 'right',
        labels: {
          padding: 25,
          boxWidth: 9,
          color: labelColor,
          usePointStyle: true
        }
      }
    }
  }

  // ** Chart Data
  const data = {
    labels: ['دانشجو', 'ادمین', 'استاد', 'کاربر عادی', 'سایر کاربران'],
    datasets: [
      {
        borderWidth: 0,
        label: 'درصد',
        data: usersRolesPercentArray && usersRolesPercentArray,
        backgroundColor: [successColorShade, warningColorShade, infoColorShade, greyColor,primary]
      }
    ]
  }

  return (
    <Card>
      <CardHeader className='d-flex justify-content-between align-items-sm-center align-items-start flex-sm-row flex-column'>
        <CardTitle tag='h4'>دسته‌بندی کاربران بر اساس نقش</CardTitle>
      </CardHeader>
      <CardBody>
        <div style={{ height: '350px' }}>
          <PolarArea data={data} options={options} height={350} />
        </div>
      </CardBody>
    </Card>
  )
}

export default ChartjsPolarAreaChart
