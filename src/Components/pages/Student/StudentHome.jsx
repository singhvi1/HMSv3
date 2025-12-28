import { student } from "../../../../data";
import { studentActions } from "../../common/config.action";
import QuickActionsGrid from "../../common/QuickActionGrid";
// import QuickActions from "../../dashboard/QuickActions";
import ProfileHero from "../../profile/ProfileHero";

const StudentHome = () => {
  return (
    <section className="space-y-6">
      <ProfileHero student={student} />
      <QuickActionsGrid actions={studentActions}/>
      {/* <QuickActions /> */}
    </section>
  );
};

export default StudentHome;
