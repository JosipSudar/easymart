import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import axios from "axios";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/orders")
      .then((res) => setOrders(res.data.orders));
  }, []);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>UserId</TableHead>
          <TableHead>Ordered Items</TableHead>
          <TableHead>Address</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Zip</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Total price</TableHead>
          <TableHead className="text-right">Payment Method</TableHead>
          <TableHead className="text-right">Time Created</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders &&
          orders.map((orders) => (
            <TableRow key={orders._id} className="text-center">
              <TableCell className="font-medium">{orders._id}</TableCell>
              <TableCell>{orders.user}</TableCell>
              <TableCell className="w-[200px]">
                {orders.orderItems.map((item) => `${item}, `)}
              </TableCell>
              <TableCell>{orders.adress}</TableCell>
              <TableCell>{orders.city}</TableCell>
              <TableCell>{orders.postalCode}</TableCell>
              <TableCell>{orders.country}</TableCell>
              <TableCell>{orders.totalPrice}</TableCell>
              <TableCell>{orders.paymentMethod}</TableCell>
              <TableCell>No date recorded</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default OrdersTable;
