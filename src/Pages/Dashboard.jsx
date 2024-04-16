import DashboardCard from "@/Components/DashboardCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaUsers, FaBox, FaProductHunt } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import Chart1 from "../assets/images/line-chart.png";
import Chart2 from "../assets/images/chart.png";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/products").then((res) => {
      setProducts(res.data.products);
    });
    axios.get("http://localhost:3000/api/user").then((res) => {
      setUsers(res.data.users);
    });
    axios.get("http://localhost:3000/api/orders").then((res) => {
      setOrders(res.data.orders);
    });
  }, []);
  return (
    <div className="m-5">
      <h1 className="text-5xl font-bold text-center mb-10">Dashboard</h1>
      <Tabs defaultValue="summary" className="">
        <TabsList className=" text-black w-full gap-10 h-full mb-10 bg-white">
          <TabsTrigger value="summary" className="text-xl bg-blue-100">
            Summary
          </TabsTrigger>
          <TabsTrigger value="users" className="text-xl bg-blue-100">
            Users
          </TabsTrigger>
          <TabsTrigger value="orders" className="text-xl bg-blue-100">
            Orders
          </TabsTrigger>
          <TabsTrigger value="products" className="text-xl bg-blue-100">
            Products
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <div className="flex justify-evenly my-5 gap-10">
            <DashboardCard
              title="Total Users"
              number={users.length}
              icon={<FaUsers />}
              desc="+10% from last month"
            />
            <DashboardCard
              title="Total Orders"
              number={orders.length}
              icon={<FaBox />}
              desc="+10% from last month"
            />
            <DashboardCard
              title="Total Products"
              number={products.length}
              icon={<FaProductHunt />}
              desc="+10% from last month"
            />
            <DashboardCard
              title="Total Sales"
              number={orders.length}
              icon={<GoGraph />}
              desc="+10% from last month"
            />
          </div>
          <div className="flex gap-5 items-center">
            <div className="w-1/2">
              <img src={Chart1} alt="chart" className="w-full h-full" />
              <h1 className="text-3xl text-center mt-10">
                Total orders by month
              </h1>
            </div>
            <div className="w-1/2 h-1/2">
              <img src={Chart2} alt="chart" className="w-full h-full" />
              <h1 className="text-3xl text-center mt-10">
                Total visitors by month
              </h1>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="users">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Purchases</TableHead>
                <TableHead className="text-right">Time Created</TableHead>
                <TableHead className="text-right">RoleID</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users &&
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell className="font-medium">{user._id}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.purchases.length}</TableCell>
                    <TableCell className="text-right">
                      {user.createdAt || "no time created"}
                    </TableCell>
                    <TableCell className="text-right">{user.role}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="orders">
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
        </TabsContent>
        <TabsContent value="products">
          <Dialog>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Desc</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Discount %</TableHead>
                  <TableHead className="text-right">Rating</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                  <TableHead className="text-right">Brand</TableHead>
                  <TableHead className="text-right">Category</TableHead>
                  <TableHead className="text-right">Thumbnail</TableHead>
                  <TableHead className="text-right">Images</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products &&
                  products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        {product._id}
                      </TableCell>
                      <TableCell>{product.title}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell className="text-right">
                        {product.discountPercentage}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.rating}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.stock}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.brand}
                      </TableCell>
                      <TableCell className="text-right">
                        {product.category}
                      </TableCell>
                      <TableCell className="text-right">
                        <img
                          src={product.thumbnail}
                          className="w-20 h-20 object-contain"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        {product.images.map((image) => (
                          <img
                            src={image}
                            alt="product image"
                            className="w-10 h-10"
                            key={image}
                          />
                        ))}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
