const sendOrderEmail = async (userEmail, order, templateType) => {
    const templates = {
      confirmation: `Your order #${order._id} has been confirmed`,
      shipped: `Order #${order._id} has been shipped (Tracking: ${order.trackingNumber})`,
      delivered: `Order #${order._id} was delivered`
    };
  
    // In production, integrate with Nodemailer/SendGrid
    console.log(`Email to ${userEmail}: ${templates[templateType]}`);
  };
  
  module.exports = { sendOrderEmail };