import React, { Fragment, useState } from "react";
import { Form, Button, Image, Icon, Input } from 'semantic-ui-react';
import { useAuth0 } from "../../react-auth0-spa";

const MenuForm = () => {
  const { user, getTokenSilently } = useAuth0();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [picture, setPicture] = useState('');

  const foodPicture = () => {
    let pictureUrl = picture ? picture : 'https://react.semantic-ui.com/images/wireframe/square-image.png';
    return <Image src={pictureUrl} size='medium' circular />
  }

  const submitForm = async () => {
    const formParams = {
      name: name,
      description: description,
      price: price,
      ingredients: ingredients.split(",").map( s => s.trim()),
      picture: picture
    };
    console.log(formParams);
    try {
      const token = await getTokenSilently();
      fetch("/api/foods", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(formParams)
      })
      .then(response => response.json())
      .then(data => {
        console.log("New Food created!");
      });
    } catch (error) {
      console.error(error);
    }
  }

  const uploadPicture = (e) => {

    const formData = new FormData();

    formData.append('file', e.target.files[0]);
    try {
      fetch('/api/picture_upload', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(image => {
        console.log(image);
        setPicture(image.secure_url);
      })
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <Fragment>
      { foodPicture() }
      <input type='file' onChange={uploadPicture} />
      <Form onSubmit={submitForm}>
        <Form.Field>
          <label>Name</label>
          <input placeholder='Name' defaultValue={name} onChange={e => setName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input placeholder='Description' defaultValue={description} onChange={e => setDescription(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input placeholder='Price' defaultValue={price} onChange={e => setPrice(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Ingredients</label>
          <input placeholder='Ingredients' defaultValue={ingredients} onChange={e => setIngredients(e.target.value)} />
        </Form.Field>
        
        <Button type='submit'>Submit</Button>
      </Form>
    </Fragment>
  )
}

export default MenuForm;