import React, { Fragment, useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Card } from 'semantic-ui-react';

const MyOrders = () => {
  const { user, getTokenSilently } = useAuth0();
  const [orderList, setOrderList] = useState([]);

  const getOrders = async () => {
    try {
      const token = await getTokenSilently();

      fetch(`/api/users/${user.id}/orders`, {
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

  useEffect(
    () => {
      if (user) {
        getOrders();
      }
    }, [user]
  )

  return (
    <Fragment>
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
    </Fragment>
  )
}

export default MyOrders;