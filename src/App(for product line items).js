import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import moment from "moment";

const api = new WooCommerceRestApi({
  url: "https://airestechstg.wpengine.com",
  consumerKey: "ck_a8d2094034cd23d69511b205be6fbfc205357bef",
  consumerSecret: "cs_8397b71cce56838633f5ac6112f7168cc1246738",
  version: "wc/v3"
});

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  let fetchOrders = () => {
    api
      .get("orders", {
        page:6,
        per_page: 100,
        status: "completed",
        after: "2021-11-01T00:00:00",
        before: "2021-11-17T23:59:59"
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
            <th>Lifetune Device</th>
            <th>Lifetune Room</th>
            <th>Lifetune Personal</th>
            <th>Lifetune Mini|Pet</th>
            <th>Lifetune Room (trade)</th>
            <th>Lifetune Personal (trade)</th>
            <th>Lifetune Device (trade)</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>

          {orders.map((order, index) => {
            const currency = order.currency;
            if (currency == 'EUR'){
              return (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{moment(order.date_paid).format("MM-DD-YYYY")}</td>
                  <td>{order.total}</td>
                  <td>{order.currency}</td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 33515)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 33517)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 33516)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 33518)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 33534)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 33533)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 33532)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>{order.status}</td>
  
                </tr>
              );
            } 
            
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
