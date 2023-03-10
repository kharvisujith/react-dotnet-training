import { Typography, Grid, Paper, Box, Button } from "@mui/material";
import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import AppTextInput from "../components/AppTextInput";
import { Products } from "../models/Products";
import AppDropzone from "../components/AppDropzone"
import agent from "../api/agent";
import { useAppDispatch } from "../store/configureStore";
import { setProduct } from "../Features/catalog/catalogSlice";

interface Props {
    product?:Products
    cancelEdit: ()=> void;
}


export default function ProductForm({product,cancelEdit }:Props) {
    const { control,reset,handleSubmit } = useForm();

    const dispatch = useAppDispatch()

    useEffect(()=> {
        if(product) reset(product)
    },[product, reset])

    const handleSubmitData =async (data:FieldValues)=>{
        try{
            let response : Products;
            if(product){
                response = await agent.admin.updateProduct(data)
            } else {
                response = await agent.admin.createProduct(data)
            }
            dispatch(setProduct(response))
            cancelEdit();
            
        } catch(error:any){
            console.log(error)
        }
    }


    return (
        <Box component={Paper} sx={{p: 4}}>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <AppTextInput control={control} name='name' label='Product name' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='brand' label='Brand' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput control={control} name='type' label='Type' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type='number' control={control} name='price' label='Price' />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <AppTextInput type='number' control={control} name='quantityInStock' label='Quantity in Stock' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput mulitline={true} rows={4} control={control} name='description' label='Description' />
                </Grid>
                <Grid item xs={12}>
                    <AppTextInput control={control} name='pictureUrl' label="Image" />
                    {/* <AppDropzone control={control} name='file' /> */}
                    {/* <AppDropzone control={control} name='file' /> */}
                    
                </Grid>
            </Grid>
            <Box display='flex' justifyContent='space-between' sx={{mt: 3}}>
                <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                <Button type='submit' variant='contained' color='success'>Submit</Button>
            </Box>
            </form>
        </Box>
    )
}