const AdminStudentActions = ({ student }) => {
  console.log(student); //we will use this sudent data to perform admin actions
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <h3 className="font-semibold text-lg">Admin Actions</h3>

      <div className="grid sm:grid-cols-6 grid-cols-2 gap-3">
        <button className="px-2 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">
          Edit Info
        </button>

        <button className="px-2 py-1 rounded bg-yellow-500 text-black hover:bg-yellow-600">
          Change Status
        </button>

        <button className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700">
          Delete Student
        </button>

        <button className="px-2 py-1 rounded bg-gray-500 text-white hover:bg-gray-600">
          Add Discipline
        </button>
      </div>
    </div>
  );
};

export default AdminStudentActions;
