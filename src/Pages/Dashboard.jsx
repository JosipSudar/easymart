import DashboardCard from "@/Components/DashboardCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaUsers, FaBox, FaProductHunt } from "react-icons/fa";
import { GoGraph } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/Components/ui/button";
import { Toaster, toast } from "sonner";
import DarkModeContext from "@/state/DarkMode";
import UserTable from "@/Components/tables/UserTable";
import OrdersTable from "@/Components/tables/OrdersTable";
import LineChart from "@/Components/LineChart";

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
  const darkMode = useContext(DarkModeContext);

  const updateProductData = (id) => {
    axios
      .patch(`http://localhost:3000/api/products/${id}`, productData)
      .then((res) => {
        if (res.status === 200) {
          toast("Product updated successfully", { type: "success" });
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const images = productData.images;
    images[index] = value;
    setProductData({
      ...productData,
      images,
    });
  };

  const addImage = () => {
    setProductData({
      ...productData,
      images: [...productData.images, ""],
    });
  };

  const addProduct = () => {
    axios
      .post("http://localhost:3000/api/products", productData)
      .then((res) => {
        if (res.status === 201) {
          alert("Product added successfully");
          setProductData({
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
        }
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
    <div className={darkMode ? "dark" : ""}>
      <div className="p-5">
        <h1 className="text-5xl font-bold text-center mb-10">Dashboard</h1>
        <Tabs defaultValue="summary" className="">
          <TabsList className=" text-black w-full gap-5 h-full mb-10 bg-white">
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
            <div className="flex justify-evenly my-5 gap-10 lg:flex-row flex-col">
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
                <LineChart />
              </div>
              <div className="w-1/2"></div>
            </div>
          </TabsContent>
          <TabsContent value="users">
            <UserTable />
          </TabsContent>
          <TabsContent value="orders">
            <OrdersTable />
          </TabsContent>
          <TabsContent value="products">
            <Dialog>
              <DialogTrigger className="bg-green-700 rounded-md p-2 text-gray-200 my-2">
                Add Product
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Product details</DialogTitle>
                  <DialogDescription>
                    <div className="flex flex-col gap-2">
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
                        <label htmlFor="description">Description</label>
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
                        {productData.images.map((image, index) => (
                          <input
                            key={index}
                            className="border-2 border-gray-300 p-2 rounded-md w-full ml-auto"
                            value={image}
                            type="text"
                            id="images"
                            name="images"
                            onChange={(e) => handleImageChange(e, index)}
                          />
                        ))}
                        <Button onClick={addImage}>Add Image</Button>
                      </div>
                      <div className="flex items-center gap-2 justify-center">
                        <Button onClick={addProduct}>Add</Button>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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
                            <DialogTrigger
                              onClick={() => setProductData(product)}
                              className="text-blue-500 underline"
                            >
                              View details
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>{product._id}</DialogTitle>
                                <DialogDescription>
                                  <div className="flex flex-col gap-2">
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
                                      <label htmlFor="thumbnail">
                                        Thumbnail
                                      </label>
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
                                        onClick={() =>
                                          updateProductData(product._id)
                                        }
                                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                                      >
                                        Update
                                      </button>
                                      <button
                                        className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                                        onClick={() =>
                                          deleteProduct(product._id)
                                        }
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
        <Toaster position="bottom-left" />
      </div>
    </div>
  );
};

export default Dashboard;
