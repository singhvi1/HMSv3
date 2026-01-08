import { useDispatch, useSelector } from "react-redux";
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import { lazy, Suspense, useEffect, useState } from "react";

const Home = lazy(() => import("./Components/Home"));
const Login = lazy(() => import("./Components/Login"));
const AdminDashBoard = lazy(() =>
  import("./Components/pages/admins/AdminDashBoard")
);

const StudentDashboard = lazy(() =>
  import("./Components/pages/Student/StudentDashBoard")
);

const StudentHome = lazy(() =>
  import("./Components/pages/Student/StudentHome")
);

const MaintenanceList = lazy(() =>
  import("./Components/pages/Student/MaintenanceList")
);

const MaintenanceForm = lazy(() =>
  import("./Components/forms/MaintenanceForm")
);

const LeaveForm = lazy(() =>
  import("./Components/forms/LeaveForm")
);

const AnnounceMents = lazy(() =>
  import("./Components/dashboard/AnnounceMents")
);

const NotFound = lazy(() =>
  import("./Components/NotFound")
);

const AdminHome = lazy(() =>
  import("./Components/pages/admins/AdminHome")
);
const CreateAnnouncement = lazy(() =>
  import("./Components/pages/admins/announcements/CreateAnnouncement")
);
const AnnounceMentDetail = lazy(() =>
  import("./Components/dashboard/AnnounceMentDetail")
);

const EditAnnouncement = lazy(() =>
  import("./Components/pages/admins/announcements/EditAnnouncement")
);
const CreateStudent = lazy(() =>
  import("./Components/forms/CreateStudent")
);
const StudentList = lazy(() =>
  import("./Components/pages/admins/list/student/StudentList")
);
const IssuesList = lazy(() =>
  import("./Components/pages/admins/list/issues/IssuesList")
);
const RoomsList = lazy(() => import("./Components/pages/admins/list/room/RoomsList"))
const LeavesList = lazy(() => import("./Components/pages/admins/list/leave/LeavesList"))
const AdminStudentProfile = lazy(() => import("./Components/pages/admins/list/student/AdminStudentProfile"))
const AdminRoomProfile = lazy(() => import("./Components/pages/admins/list/room/AdminRoomProfile"))
const EditRoom = lazy(() => import("./Components/pages/admins/list/room/EditRoom"))
const CreateRoom = lazy(() => import("./Components/forms/CreateRoom"))
const EditStudent = lazy(() => import("./Components/pages/admins/list/student/EditStudent"))
const AdminIssueProfile = lazy(() => import("./Components/pages/admins/list/issues/AdminIssueProfile"));
const PageLoader = lazy(() => import("./Components/common/PageLoader"))
import { removeLoggedinUser, setLoggedinUser } from './utils/store/logedinUser'
import { userService } from "./services/apiService";
const List = lazy(() => import("./Components/pages/Student/studentPersonalList/List"));
const HostelOverview = lazy(() => import("./Components/pages/admins/hostel/HostelOverview"))
const EditHostel = lazy(() => import("./Components/pages/admins/hostel/EditHostel"))
const HostelForm = lazy(() => import("./Components/forms/HostelForm"))



function App() {
  const user = useSelector((state) => state.loggedinUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
      return;
    }
    const fetchMe = async () => {
      try {
        const res = await userService.getMe();
        dispatch(setLoggedinUser(res.data.user));
      } catch (err) {
        dispatch(removeLoggedinUser());
        console.log(err)
      } finally {
        setLoading(false)
      }
    };

    fetchMe();
  }, [dispatch, user]);


  if (loading) {
    return <PageLoader />
  }


  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {user ? (
          <>
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/"
              element={
                <Navigate
                  to={user.role === "student" ? "/student" : "/admin"}
                  replace
                />
              }
            />


            {user.role === "student" && (
              <Route path="/student" element={<StudentDashboard />}>
                <Route index element={<StudentHome />} />
                <Route path="leave/new" element={<LeaveForm />} />
                <Route path="issues" element={<MaintenanceList />} />
                <Route path="list" element={<List />} />
                <Route path="issues/:id" element={<AdminIssueProfile />} />
                <Route path="issues/new" element={<MaintenanceForm />} />
                <Route path="anns" element={<AnnounceMents />} />
                <Route path="anns/:id" element={<AnnounceMentDetail />} />
                <Route path="*" element={<NotFound />} />

              </Route>
            )}

            <Route path="/" element={<Home />} />



            {user.role === "admin" && (
              <Route path="/admin" element={<AdminDashBoard />}>
                <Route index element={<AdminHome />} />
                <Route path="hostel" element={<HostelOverview />} />
                <Route path="hostel/new" element={<HostelForm />} />
                <Route path="hostel/:id/edit" element={<EditHostel />} />

                <Route path="anns" element={<AnnounceMents />} />
                <Route path="anns/new" element={<CreateAnnouncement />} />
                <Route path="anns/:id" element={<AnnounceMentDetail />} />
                <Route path="anns/:id/edit" element={<EditAnnouncement />} />
                <Route path="students" element={<StudentList />} />
                <Route path="students/new" element={<CreateStudent />} />
                <Route path="students/:id" element={<AdminStudentProfile />} />
                <Route path="students/:id/edit" element={<EditStudent />} />
                <Route path="rooms" element={<RoomsList />} />
                <Route path="rooms/new" element={<CreateRoom />} />
                <Route path="rooms/:id" element={<AdminRoomProfile />} />
                <Route path="rooms/:id/edit" element={<EditRoom />} />
                <Route path="issues" element={<IssuesList />} />
                <Route path="issues/:id" element={<AdminIssueProfile />} />
                <Route path="leaves" element={<LeavesList />} />
                <Route path="*" element={<NotFound />} />

              </Route>
            )}
          </>
        ) : (
          <>

            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
      </Routes>
    </Suspense>

  );
}

export default App;

