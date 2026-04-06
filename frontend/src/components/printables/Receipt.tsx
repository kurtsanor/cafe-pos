import React from "react";
import classes from "../../styles/Receipt.module.css";
import type { Order } from "../../types/order/order";
import type { MongooseOrderItem } from "../../types/orderItem/orderItem";

interface ReceiptProps {
  order: Order;
  orderItems: MongooseOrderItem[];
}

const Receipt = React.forwardRef<HTMLDivElement, { data: ReceiptProps }>(
  (props, ref) => {
    const { order, orderItems } = props.data;

    // Helper to format date/time from the order
    const orderDate = new Date(order?.createdAt);
    const dateStr = orderDate?.toLocaleDateString();
    const timeStr = orderDate?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div ref={ref} className={classes.receiptContainer}>
        {/* Header Section */}
        <div className={classes.headerTitleBox}>
          <h2 className={classes.brandName}>SUNBREW CAFE</h2>
          <p>Address: 123 Lacson Street, Bacolod City</p>
          <h1 className={classes.receiptLabel}>RECEIPT</h1>
        </div>

        {/* Asterisk Divider */}
        <div className={classes.asteriskDivider}>
          ******************************************
        </div>

        {/* Metadata Section: Order #, Date, Time */}
        <div className={classes.metadataSection}>
          <div className={classes.flexRow}>
            <span>Order ID: {order?.orderId}</span>
            <span>Date: {dateStr}</span>
          </div>
          <div className={classes.flexRow}>
            <span>{/* Empty left side to match image layout */}</span>
            <span>Time: {timeStr}</span>
          </div>
        </div>

        <div className={classes.asteriskDivider}>
          ******************************************
        </div>

        {/* Items List */}
        <div className={classes.itemsSection}>
          {orderItems?.map((item) => (
            <div key={item._id} className={classes.flexRow}>
              <span>{`${item.quantity}x ${item.productId?.name}`}</span>
              <span>{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className={classes.lineDashed} />

        {/* Payment Summary */}
        <div className={classes.summarySection}>
          <div className={`${classes.flexRow} ${classes.bold}`}>
            <span>TOTAL:</span>
            <span>₱ {order?.totalAmount.toFixed(2)}</span>
          </div>
          <div className={classes.flexRow}>
            <span>CASH:</span>
            <span>{/* Add cash prop here if available */} 0.00</span>
          </div>
          <div className={classes.flexRow}>
            <span>CHANGE:</span>
            <span> 0.00</span>
          </div>
        </div>

        <div className={classes.lineDashed} />

        {/* Footer */}
        <div className={classes.footerSection}>
          <p>Thanks for ordering!</p>
        </div>
      </div>
    );
  },
);

Receipt.displayName = "Receipt";
export default Receipt;
