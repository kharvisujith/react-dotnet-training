import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material"
import { useState, useEffect } from "react"
import agent from "../../api/agent"
import LoadingComponent from "../../Layouts/LoadingComponent"
import {Order} from '../../models/order'
import { currencyFormat } from "../../util/util"
 
const Orders = ()=>{

    const [orders, setOrders] = useState<Order[] | null >(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(()=>{
        setLoading(true)
        agent.orders.list()
        .then(orders => setOrders(orders))
        .catch(error => console.log(error))
        .finally(()=> setLoading(false))
    },[])

    if(loading) return <LoadingComponent />

    return (
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Order Number</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Order Date</TableCell>
            <TableCell align="right">Order Status</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="right">{currencyFormat(order.total)}</TableCell>
              <TableCell align="right">{order.orderDate.split('T')[0]}</TableCell>
              <TableCell align="right">{order.orderStatus}</TableCell>
              <TableCell align="right">
                  <Button>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    )
       
}
export default Orders

