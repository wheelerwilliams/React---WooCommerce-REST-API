import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import moment from "moment";

const api = new WooCommerceRestApi({
  url: "https://airestechstg.wpengine.com",
  consumerKey: "ck_a8d2094034cd23d69511b205be6fbfc205357bef",
  consumerSecret: "cs_8397b71cce56838633f5ac6112f7168cc1246738",
  version: "wc/v3",
});

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  let fetchOrders = () => {
    api
      .get("orders", {
        per_page: 100,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data, "ddd");
          setOrders(response.data);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="App">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Name</th>
            <th>Email</th>
            <th>Adress</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{moment(order.date).format("DD-MM-YYYY")}</td>
                <td>{order.total}</td>
                <td>{order.currency}</td>
                <td>{order.billing && order.billing.first_name}</td>
                <td>{order.billing && order.billing.email}</td>
                <td>{order.billing && order.billing.address_1}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
