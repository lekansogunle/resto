import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from 'semantic-ui-react';
import { useAuth0 } from "../../react-auth0-spa";

const Admin = () => {
  const { user, getTokenSilently } = useAuth0();
  const [orderList, setOrderList] = useState([]);

  useEffect(
    () => {
      const getAllOrders = async () => {
        try {
          const token = await getTokenSilently();
    
          fetch(`/api/orders`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
            .then(response => response.json())
            .then(data => {
              setOrderList(data.body);
            });
        } catch (error) {
          console.error(error);
        }
      }

      if (user) {
        getAllOrders();
      }
    }, [user, getTokenSilently]
  )

  const editButton = (
    <Button size='mini'>Edit</Button>
  )

  return (
    <Fragment>
      <Link to="/update-menu">Update Menu</Link>
      <div>
        {
          orderList.map((order, i) => {
            return(
              <div key={i}>
                {
                  order.items.map((item, j) => {
                    return (
                      <Card
                        image={item.picture}
                        header={item.name}
                        meta={`Item ${j+1}`}
                        description={item.ingredients.join(", ")}
                        extra={editButton}
                        key={j}
                      />
                    )
                  })
                }
                <h2>Amount: {order.amount}</h2>
                <h2>Status: {order.status}</h2>
              </div>
            )
          })

        }
      </div>
    </Fragment>
  )
}

export default Admin;