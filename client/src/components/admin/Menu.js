import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from 'semantic-ui-react';

const AdminMenu = () => {
  const [foodList, setFoodList] = useState([]);

  useEffect(
    () => {
      try {
        fetch("/api/foods")
          .then(response => response.json())
          .then(data => setFoodList(data.body));
      } catch (error) {
        console.error(error);
      }
    }, []
  )

  const editButton = (
    <Link to={``}>
      <Button size='mini'>Edit</Button>
    </Link>
  )

  return (
    <Fragment>
      <Link to="/create-menu">Create Menu</Link>
      <div>
        {
          foodList.map((food, i) => {
            return(
              <Card
                image={food.picture}
                header={food.name}
                description={food.ingredients.join(", ")}
                extra={editButton}
                key={i}
              />
            )
          })
        }
      </div>
    </Fragment>
  )
}

export default AdminMenu;