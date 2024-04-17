import DashboardCard from "@/Components/DashboardCard";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: [],
  });

  const updateProductData = (id) => {
    axios
      .patch(
        `http://localhost:3000/api/products/${id}`,
        productData
      )
      .then((res) => {
        console.log(res);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3000/api/products/${id}`).then((res) => {
      console.log(res);
    });
  };

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
  }, [products]);
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
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 rounded-s-lg">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Discount %
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Rating
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stock
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Brand
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Thumbnail
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Images
                  </th>
                  <th scope="col" className="px-6 py-3 rounded-e-lg">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product, index) => (
                    <tr className="bg-white" key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                      >
                        {product._id}
                      </th>
                      <td className="px-6 py-4">{product.title}</td>
                      <td className="px-6 py-4">{product.description}</td>
                      <td className="px-6 py-4">{product.price}</td>
                      <td className="px-6 py-4">
                        {product.discountPercentage}
                      </td>
                      <td className="px-6 py-4">{product.rating}</td>
                      <td className="px-6 py-4">{product.stock}</td>
                      <td className="px-6 py-4">{product.brand}</td>
                      <td className="px-6 py-4">{product.category}</td>
                      <td className="px-6 py-4">
                        <img src={product.thumbnail} alt="thumbnail" />
                      </td>
                      <td className="px-6 py-4">
                        {product.images.map((image) => (
                          <img
                            src={image}
                            alt="product image"
                            className="w-10 h-10"
                            key={image}
                          />
                        ))}
                      </td>
                      <td className="px-6 py-4">
                        <Dialog>
                          <DialogTrigger onClick={()=>setProductData(product)} className="text-blue-500 underline">
                            View details
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>{product._id}</DialogTitle>
                              <DialogDescription>
                                <div
                                  className="flex flex-col gap-2"
                                >
                                  <div className="flex gap-2 items-center">
                                    <label htmlFor="title">Title</label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md ml-auto w-full"
                                      value={productData.title}
                                      type="text"
                                      id="title"
                                      name="title"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <label htmlFor="description">
                                      Description
                                    </label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md ml-auto w-full"
                                      value={productData.description}
                                      type="text"
                                      id="description"
                                      name="description"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label htmlFor="price">Price</label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md ml-auto w-full"
                                      value={productData.price}
                                      type="text"
                                      id="price"
                                      name="price"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label htmlFor="discountPercentage">
                                      Discount Percentage
                                    </label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md w-full ml-auto"
                                      value={productData.discountPercentage}
                                      type="text"
                                      id="discountPercentage"
                                      name="discountPercentage"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label htmlFor="rating">Rating</label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md w-full ml-auto"
                                      value={productData.rating}
                                      type="text"
                                      id="rating"
                                      name="rating"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label htmlFor="stock">Stock</label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md ml-auto w-full"
                                      value={productData.stock}
                                      type="text"
                                      id="stock"
                                      name="stock"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label htmlFor="brand">Brand</label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md ml-auto w-full"
                                      value={productData.brand}
                                      type="text"
                                      id="brand"
                                      name="brand"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label htmlFor="category">Category</label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md w-full ml-auto"
                                      value={productData.category}
                                      type="text"
                                      id="category"
                                      name="category"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label htmlFor="thumbnail">Thumbnail</label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md w-full ml-auto"
                                      value={productData.thumbnail}
                                      type="text"
                                      id="thumbnail"
                                      name="thumbnail"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <label htmlFor="images">Images</label>
                                    <input
                                      className="border-2 border-gray-300 p-2 rounded-md w-full ml-auto"
                                      value={productData.images}
                                      type="text"
                                      id="images"
                                      name="images"
                                      onChange={handleChange}
                                    />
                                  </div>
                                  <div className="flex items-center gap-2 justify-center">
                                    <button
                                      onClick={() => updateProductData(product._id)}
                                      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                                    >
                                      Update
                                    </button>
                                    <button
                                      className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                      onClick={() => deleteProduct(product._id)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
