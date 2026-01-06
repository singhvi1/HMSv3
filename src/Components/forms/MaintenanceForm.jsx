import { useState } from 'react';
import toast from 'react-hot-toast';
import { Wrench, PenTool as Tool,} from 'lucide-react';
import { student } from '../../../data';
import BackButton from '../common/ui/Backbutton';



// const MaintenanceForm = ({ onClose }) => {
const MaintenanceForm = () => {
  const [form, setForm] = useState({
    description: "",
    category: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Maintenance request submitted successfully!');
    setForm({ description: "", category: "" });
    // onClose();
  };


  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }
  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-8 m-5 border">
        <BackButton />
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Wrench className="md:w-8 md:h-8 text-indigo-600" />
            </div>
            <div>
              <h2 className=" font-semibold  md:text-2xl md:font-bold text-gray-800">Maintenance Request</h2>
              <p className="text-gray-500">{`Submit a new maintenance request for your room : ${student?.room_number || ""}`}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-1 gap-6">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="relative">
              <select
                value={form.category}
                onChange={handleChange}
                // onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 shadow-sm pl-10 py-3 outline-none active:border-blue-500 focus:ring-2 focus:ring-blue-500 "
              >
                <option value="plumbing">Plumbing</option>
                <option value="electrical">Electrical</option>
                <option value="furniture">Furniture</option>
                <option value="cleaning">Cleaning</option>
                <option value="other">Other</option>
              </select>
              <Tool className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={form.description}
              // onChange={(e) => setDescription(e.target.value)}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg border-gray-300 shadow-sm outline-none p-2  active:border-blue-500 focus:ring-2 focus:ring-blue-500  "
              placeholder="Please describe the issue in detail..."
              required
            />
          </div>



          <button
            type="submit"
            className="w-full bg-linear-to-r from-indigo-600 to-blue-500 text-white py-3 px-6 rounded-lg hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-[1.02]"
          >
            Submit Request
          </button>
        </form>
      </div>
    </>
  );
};

export default MaintenanceForm;