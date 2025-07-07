import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../auth/AuthContext';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  CircularProgress,
  Alert,
  Chip
} from '@mui/material';
import { format } from 'date-fns';
import { IoSearchOutline } from 'react-icons/io5';
import { MdFilterList } from 'react-icons/md';

const ManageOrders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [updateLoading, setUpdateLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const orderStatuses = [
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'delivered',
    'cancelled',
    'refunded'
  ];

  const validTransitions = {
    pending: ['processing', 'cancelled'],
    processing: ['shipped', 'cancelled'],
    shipped: ['delivered', 'cancelled'],
    delivered: ['refunded'],
    cancelled: [],
    refunded: []
  };

  const getAvailableStatuses = (currentStatus) => {
    return validTransitions[currentStatus] || [];
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter, dateRange]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get the token from localStorage
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setError('Authentication token not found. Please login again.');
        return;
      }

      let url = `http://localhost:8020/api/admin/orders?page=${currentPage}&limit=10`;
      
      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`;
      }
      
      if (dateRange.startDate && dateRange.endDate) {
        url += `&startDate=${dateRange.startDate}&endDate=${dateRange.endDate}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });

      if (response.data.success) {
        setOrders(response.data.orders);
        setTotalPages(Math.ceil(response.data.total / 10));
      } else {
        throw new Error(response.data.message || 'Failed to fetch orders');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const storedToken = localStorage.getItem('token');
      if (!storedToken) {
        setError('Authentication token not found. Please login again.');
        return;
      }

      if (!validateStatusChange(selectedOrder.status, newStatus)) {
        setError(`Invalid status transition. Valid transitions from ${selectedOrder.status} are: ${getAvailableStatuses(selectedOrder.status).join(', ')}`);
        return;
      }

      const response = await axios.put(
        `http://localhost:8020/api/admin/orders/${selectedOrder._id}/status`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        }
      );

      if (response.data.success) {
        setSuccess('Order status updated successfully');
        setSelectedOrder(null);
        setStatusModalOpen(false);
        fetchOrders();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update order status');
    }
  };

  const getStatusFlowDescription = (status) => {
    switch (status) {
      case 'pending':
        return 'Order is pending and can be moved to processing or cancelled';
      case 'processing':
        return 'Order is being processed and can be moved to shipped or cancelled';
      case 'shipped':
        return 'Order has been shipped and can be moved to delivered or cancelled';
      case 'delivered':
        return 'Order has been delivered and can be refunded if needed';
      case 'cancelled':
        return 'Order has been cancelled and cannot be changed';
      case 'refunded':
        return 'Order has been refunded and cannot be changed';
      default:
        return '';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-indigo-100 text-indigo-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      order._id.toLowerCase().includes(searchTerm) ||
      order.userDetails.email.toLowerCase().includes(searchTerm) ||
      order.userDetails.firstName.toLowerCase().includes(searchTerm) ||
      order.userDetails.lastName.toLowerCase().includes(searchTerm)
    );
  });

  if (loading) {
    return (
      <div className="p-6 bg-green-950 rounded-lg shadow space-y-6">
        <div className="text-center text-yellow-500 py-8">Loading orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-green-950 rounded-lg shadow space-y-6">
        <div className="text-center text-red-500 py-8">
          {error}
          <button
            onClick={() => window.location.reload()}
            className="block mx-auto mt-4 bg-yellow-500 text-green-950 px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-green-950 rounded-lg shadow space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <h2 className="text-2xl font-bold text-yellow-500 mb-4 md:mb-0">
          Order Management
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <IoSearchOutline className="absolute left-3 top-3 text-green-700 text-xl" />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 p-2 text-green-950 border border-green-200 rounded-lg focus:ring-2 focus:ring-yellow-500 h-[42px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <FormControl className="w-full sm:w-48">
            <InputLabel className="text-yellow-500">Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
              className="bg-white"
            >
              <MenuItem value="all">All Orders</MenuItem>
              {orderStatuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Date Range Filter */}
          <div className="flex gap-2">
            <TextField
              type="date"
              label="Start Date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
              InputLabelProps={{ shrink: true }}
              className="bg-white rounded-lg"
            />
            <TextField
              type="date"
              label="End Date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
              InputLabelProps={{ shrink: true }}
              className="bg-white rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto rounded-lg border border-green-100">
        <table className="w-full">
          <thead className="bg-green-50">
            <tr>
              <th className="p-3 text-left text-white bg-yellow-500">Order ID</th>
              <th className="p-3 text-left text-white bg-yellow-500">Customer</th>
              <th className="p-3 text-left text-white bg-yellow-500">Date</th>
              <th className="p-3 text-left text-white bg-yellow-500">Total</th>
              <th className="p-3 text-left text-white bg-yellow-500">Status</th>
              <th className="p-3 text-left text-white bg-yellow-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="border-b text-white border-green-100 hover:bg-green-900"
              >
                <td className="p-3 font-medium">{order._id}</td>
                <td className="p-3">
                  <div>
                    <p className="font-medium">
                      {order.userDetails.firstName} {order.userDetails.lastName}
                    </p>
                    <p className="text-sm text-gray-400">{order.userDetails.email}</p>
                  </div>
                </td>
                <td className="p-3">
                  {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                </td>
                <td className="p-3">
                  <span className="text-yellow-500 font-bold">Rs. {order.totalAmount}</span>
                </td>
                <td className="p-3">
                  <Chip
                    label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    className={`${getStatusColor(order.status)} font-medium`}
                  />
                </td>
                <td className="p-3">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      console.log('Opening modal for order:', order);
                      console.log('Current order status:', order.status);
                      setSelectedOrder(order);
                      setNewStatus('');
                      setStatusModalOpen(true);
                    }}
                    className="!bg-yellow-500 !text-green-950 hover:!bg-yellow-600"
                  >
                    Update Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div className="text-center text-green-500 py-6">No orders found</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="!text-green-950 !border-green-300 !bg-green-100 hover:!bg-yellow-500"
          >
            Previous
          </Button>
          <span className="text-white">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="!text-green-950 !border-green-300 !bg-green-100 hover:!bg-yellow-500"
          >
            Next
          </Button>
        </div>
      )}

      {/* Status Update Modal */}
      <Dialog
        open={statusModalOpen}
        onClose={() => {
          setStatusModalOpen(false);
          setSelectedOrder(null);
          setNewStatus('');
          setError(null);
        }}
        PaperProps={{
          style: {
            backgroundColor: '#052e16',
            borderRadius: '12px',
            border: '2px solid #eab308'
          },
        }}
      >
        <DialogTitle className="text-yellow-500 text-2xl font-bold border-b border-yellow-500/20 pb-4">
          Update Order Status
        </DialogTitle>
        <DialogContent className="mt-4">
          {error && (
            <Alert severity="error" className="mb-4">
              {error}
            </Alert>
          )}
          <div className="mt-4 space-y-4">
            <div>
              <p className="text-white mb-2">
                Current Status: <span className="text-yellow-500 font-medium">
                  {selectedOrder?.status?.charAt(0).toUpperCase() + selectedOrder?.status?.slice(1)}
                </span>
              </p>
              <p className="text-gray-400 text-sm">
                {getStatusFlowDescription(selectedOrder?.status)}
              </p>
            </div>
            <FormControl fullWidth>
              <InputLabel className="text-yellow-500">New Status</InputLabel>
              <Select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                label="New Status"
                className="text-white border-yellow-500"
              >
                {(() => {
                  console.log('Rendering dropdown for status:', selectedOrder?.status);
                  const currentStatus = selectedOrder?.status?.toLowerCase();
                  console.log('Normalized status:', currentStatus);
                  
                  return getAvailableStatuses(currentStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ));
                })()}
              </Select>
            </FormControl>
            <div className="bg-green-900/50 p-3 rounded-lg">
              <p className="text-yellow-500 text-sm font-medium mb-1">Status Flow:</p>
              <p className="text-gray-400 text-sm">
                Pending → Processing → Shipped → Delivered
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Note: Orders can be cancelled at any stage before delivery
              </p>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="p-6 border-t border-yellow-500/20">
          <Button
            onClick={() => {
              setStatusModalOpen(false);
              setSelectedOrder(null);
              setNewStatus('');
              setError(null);
            }}
            className="!text-yellow-500 hover:!bg-yellow-500/10"
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleStatusChange(newStatus)}
            disabled={updateLoading || !newStatus}
            className="!bg-yellow-500 !text-green-950 hover:!bg-yellow-600"
          >
            {updateLoading ? (
              <CircularProgress size={24} className="!text-green-950" />
            ) : (
              'Update Status'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageOrders;
