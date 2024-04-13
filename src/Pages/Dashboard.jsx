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
import { FaUsers, FaBox, FaProductHunt } from "react-icons/fa";
import { GoGraph } from "react-icons/go";

const Dashboard = () => {
  return (
    <div className="m-5">
      <h1 className="text-5xl font-bold text-center mb-10">Dashboard</h1>
      <Tabs defaultValue="summary" className="">
        <TabsList className="bg-blue-200 text-black w-full gap-10 h-full">
          <TabsTrigger value="summary" className="text-xl">
            Summary
          </TabsTrigger>
          <TabsTrigger value="users" className="text-xl">
            Users
          </TabsTrigger>
          <TabsTrigger value="orders" className="text-xl">
            Orders
          </TabsTrigger>
          <TabsTrigger value="products" className="text-xl">
            Products
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <div className="flex justify-evenly my-5 gap-10">
            <DashboardCard
              title="Total Users"
              number="100"
              icon={<FaUsers />}
              desc="+10% from last month"
            />
            <DashboardCard
              title="Total Orders"
              number="100"
              icon={<FaBox />}
              desc="+10% from last month"
            />
            <DashboardCard
              title="Total Products"
              number="100"
              icon={<FaProductHunt />}
              desc="+10% from last month"
            />
            <DashboardCard
              title="Total Sales"
              number="100"
              icon={<GoGraph />}
              desc="+10% from last month"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <h1>Total sales history</h1>
            </div>
            <div>
              <h1>Total sales history</h1>
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
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>JohnDoe</TableCell>
                <TableCell>lSfQJ@example.com</TableCell>
                <TableCell>10</TableCell>
                <TableCell className="text-right">2022-01-01</TableCell>
                <TableCell className="text-right">Admin</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="orders">
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
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>JohnDoe</TableCell>
                <TableCell>lSfQJ@example.com</TableCell>
                <TableCell>10</TableCell>
                <TableCell className="text-right">2022-01-01</TableCell>
                <TableCell className="text-right">Admin</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="products">
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
              <TableRow>
                <TableCell className="font-medium">1</TableCell>
                <TableCell>JohnDoe</TableCell>
                <TableCell>lSfQJ@example.com</TableCell>
                <TableCell>10</TableCell>
                <TableCell className="text-right">2022-01-01</TableCell>
                <TableCell className="text-right">Admin</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
