'use client'

import { Box, Stack, Typography, Modal, TextField, Button } from '@mui/material'

import { firestore } from '@/firebase';
import { useState, useEffect } from 'react';
import { doc, collection, deleteDoc, getDocs, query, getDoc, setDoc } from 'firebase/firestore';
import { white } from 'colors';

const list = ['apple sauce', 'tomatoes', 'potatoes', 'apples', 'pears', 'grapes', 'pasta', 'apple juice']

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = []
    docs.forEach(doc => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    })

    setInventory(inventoryList);
  }


  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 });
    }
    else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()

      if (quantity == 1) {
        await deleteDoc(docRef);
      }
      else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false)

  useEffect(() => {
    updateInventory()
  }, [])

  return (
    <Box width="100vw" height="100vh"
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      gap={2}
      flexDirection={'column'}>
      <Box width='800px' height='100px' bgcolor={'f0f0f0'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Typography variant={'h2'} color={'#333'} textAlign={'center'}>
          Pantry Tracker
        </Typography>
      </Box>
      <Modal open={open} onClose={handleClose}>
        <Box
          position={"absolute"}
          top="50%"
          left="50%"
          width={400}
          bgcolor={"white"}
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
          sx={{
            transform: "translate(-50%, -50%)"
          }}
        >
          <Typography variant='h4'>Add item</Typography>
          <Stack width={'100%'} direction={"row"} overflow={'auto'} spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value)
              }}>
            </TextField>
            <Button variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant='contained'
        onClick={() => { handleOpen() }}>
        Add new item
      </Button>
      <Stack
        height="300px"
        width="800px"
        overflow={"auto"}
        border={"1px solid #333"}
        spacing={2}
      >
        {inventory.map(({ name, quantity }) => (
          <Box key={name}
            width="100%"
            minHeight="150px"
            display={"flex"}
            justifyContent={"space-between"}
            bgcolor={"f0f0f0"}
            padding={5}>
            <Typography
              variant="h3"
              color={"#333"}
              textAlign={"center"}>
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
            <Typography
              variant="h3"
              color={"#333"}
              textAlign={"center"}>
              {quantity}
            </Typography>
            <Button variant='contained' onClick={() => { addItem(name) }}>Add</Button>
            <Button variant='contained' onClick={() => { removeItem(name) }}>Remove</Button>
          </Box>
        ))}
      </Stack>
    </Box >);
}
