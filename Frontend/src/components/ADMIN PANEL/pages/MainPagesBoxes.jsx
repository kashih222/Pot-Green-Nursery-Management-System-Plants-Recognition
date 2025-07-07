import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoGift } from "react-icons/go";
import { IoStatsChart, IoPieChartOutline } from "react-icons/io5";
import { RiBankLine } from "react-icons/ri";
import { TbBrandProducthunt } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { useAuth } from '../../../components/auth/AuthContext';

const MainPagesBoxes = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTotals = async () => {
      try {
        // Fetch total products
        const productRes = await axios.get("http://localhost:8020/api/admin/plants/total", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setTotalProducts(productRes.data.total || 0);

        // Fetch total users
        const userRes = await axios.get("http://localhost:8020/api/web/total-users/total");
        setTotalUsers(userRes.data.total || 0);

        // Fetch all orders
        const orderRes = await axios.get("http://localhost:8020/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log('Orders data:', orderRes.data);
        
        if (orderRes.data && orderRes.data.orders) {
          setTotalOrders(orderRes.data.total || 0);
          
          // Calculate total sales from all orders
          const totalAmount = orderRes.data.orders.reduce((sum, order) => {
            // Include orders that are delivered, processing, or shipped
            const validStatuses = ['delivered', 'processing', 'shipped'];
            if (validStatuses.includes(order.status)) {
              const amount = parseFloat(order.totalAmount) || 0;
              console.log(`Order ${order._id} amount:`, amount, 'status:', order.status);
              return sum + amount;
            }
            return sum;
          }, 0);
          
          console.log('Calculated total sales:', totalAmount);
          setTotalSales(totalAmount);
        }
      } catch (error) {
        console.error("Error fetching totals:", error);
      }
    };

    if (token) {
      fetchTotals();
    }
  }, [token]);

  const StatBox = ({ icon, title, value, trend, color }) => (
    <div className="bg-green-950 rounded-lg p-6 hover:bg-green-900 transition-colors cursor-pointer border border-yellow-500/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`text-3xl ${color}`}>{icon}</div>
          <div>
            <p className="text-gray-300 text-sm">{title}</p>
            <p className="text-white font-semibold text-lg">{value}</p>
          </div>
        </div>
        <div className={`text-2xl ${color}`}>
          <IoStatsChart />
        </div>
      </div>
    </div>
  );

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      <StatBox
        icon={<GoGift />}
        title="Total Orders"
        value={totalOrders}
        color="text-yellow-500"
      />
      <StatBox
        icon={<IoPieChartOutline />}
        title="Total Sales"
        value={formatCurrency(totalSales)}
        color="text-green-500"
      />
      <StatBox
        icon={<RiBankLine />}
        title="Revenue"
        value={formatCurrency(totalSales * 0.4)} 
        color="text-purple-500"
      />
      <StatBox
        icon={<TbBrandProducthunt />}
        title="Products"
        value={totalProducts}
        color="text-blue-500"
      />
      <StatBox
        icon={<FaUser />}
        title="Total Users"
        value={totalUsers}
        color="text-yellow-500"
      />
    </div>
  );
};

export default MainPagesBoxes;
