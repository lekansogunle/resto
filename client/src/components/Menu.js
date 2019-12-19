import React, { Fragment, useState, useEffect } from "react";
import { Card } from 'semantic-ui-react';

const Menu = () => {
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

  return (
    <Fragment>
      <div>
        {
          foodList.map((food, i) => {
            return(
              <Card
                image={food.picture}
                header={food.name}
                description={food.ingredients.join(", ")}
                key={i}
              />
            )
          })

        }
      </div>
    </Fragment>
  )
}

export default Menu;