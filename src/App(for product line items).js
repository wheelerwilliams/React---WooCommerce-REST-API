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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
        setIsLoaded(false);
       let i = 1;
       var res = [];
       do {
            res = await fetchOrders(i++);
            console.log("res",res)
           
            setOrders(orders=> [...orders, ...res]);
       } while (res.length !== 0);
       setIsLoaded(true);
    }

    load();
  }, []);


  let fetchOrders = (page) => api
      .get("orders", {
        page: page,
        per_page: 100,
        status: "completed",
        after: "2021-01-01T00:00:00",
        before: "2021-01-31T23:59:59"
      })
      .then((response) => response.data)


  return (
    <div className="App">
      {isLoaded &&  <Table striped bordered hover>
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
            <th>Aires Defender Pro</th>
            <th>Aires Guardian</th>
            <th>Aires Shield Pro</th>
            <th>Status</th>

          </tr>
        </thead>
        <tbody>

          {orders.map((order, index) => {
            const currency = order.currency;
            if (currency == 'USD'){
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
                    if (productID == 30034)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 30033)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 30032)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 12)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 13)
                    return(
                      <span>{line_item.total}<br/></span>
                    )
                  })}
                  </td>
                  <td>
                  {order.line_items.map((line_item, index) => {
                    const productID = line_item.product_id;
                    if (productID == 10)
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
      </Table>}
    </div>
  );
}

export default App;
