import ProductTable from "../components/features/products/ProductTable";
import BarGraph from "../components/charts/BarGraph";
import LineGraph from "../components/charts/LineGraph";

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-2 w-full">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      {/* <div
        className="w-full flex flex-col justify-center items-center gap-10 sm:flex-row sm:items-center grow 
      ">
        <BarGraph />
        <LineGraph />
      </div> */}

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 border-2 border-white w-full place-items-center p-5 rounded-lg ">
        <BarGraph />
        <LineGraph />
      </div>

      <ProductTable />
    </div>
  );
};

export default Dashboard;
