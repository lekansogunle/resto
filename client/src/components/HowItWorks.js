import React from "react";
import { Icon, Step } from 'semantic-ui-react';

const HowItWorks = () => {

  return (
    <Step.Group size='massive'>
      <Step>
        <Icon name='add to cart' />
        <Step.Content>
          <Step.Title>Order</Step.Title>
        </Step.Content>
      </Step>

      <Step>
        <Icon name='payment' />
        <Step.Content>
          <Step.Title>Pay</Step.Title>
        </Step.Content>
      </Step>

      <Step>
        <Icon name='truck' />
        <Step.Content>
          <Step.Title>Delivery</Step.Title>
        </Step.Content>
      </Step>
    </Step.Group>
  )
}

export default HowItWorks;