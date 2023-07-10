import { Routes, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Home } from './components/Home';
import { Navbar } from './components/navbar';
import { OrderSummary } from './components/OrderSummary';
import { NoMatch } from './components/NoMatch';
import { Products } from './components/Products';
import { Featuredproducts } from './components/Featured_Products';
import { NewProducts } from './components/NewProducts';
import { Users } from './components/Users';
import { UserDetails } from './components/UserDetails';
import { Form } from './components/Form';
import { Content } from './components/Items';
import { OrderDetails } from './components/OrderDetails';
import { InImage } from './components/InImage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Profile} from './components/Profile'
import Terribles  from './components/Profile/Terribles'
import Recommendations  from './components/Profile/Recommendations'
import Memories  from './components/Profile/Memories'
import YourFeed  from './components/Profile/YourFeed'
import { Addmemory } from './components/Add_memory'
import {Memory88} from './components/memory88'
const LazyAbout = React.lazy(() => import('./components/About'));


function App() {

    return (
        <>
            
            <Navbar/>
            <Routes>
                <Route exact path='/' element={<Featuredproducts />} />
                {/* <Route exact path='/' element={<Sidebar />} /> */}
                
                <Route exact path='/about' element={
                    <React.Suspense fallback='loading...'>
                        <LazyAbout/>
                    </React.Suspense>
                } />
                
                <Route exact path='/Products/featured/Order-Summary' element={<OrderSummary />} />
                <Route exact path='/Products/new/Order-Summary' element={<OrderSummary />} />

                <Route exact path='/Memory54956$45' element={<InImage />} />
                {/* <Route exact path='/login' element={<SignUpLogin />} /> */}
                
                <Route path='Products' element={<Products />}>
                    <Route path = 'new' element = {<NewProducts/>}/>
                </Route>

                <Route  path='Users' element={<Users/>}>
                    <Route  path=':userID' element={<UserDetails />} />
                </Route>
                <Route exact path='/Form' element={<Form/>}/>
                <Route exact path='/Desires' element={<Content />} />
                <Route exact path='/Products/new/OrderDetails' element={<OrderDetails />} />
                <Route exact path='/Products/Featured/OrderDetails' element={<OrderDetails />} />
                <Route exact path='/addmemory' element={<Addmemory />} />
                <Route exact path='/memory88' element={<Memory88 />} />


                <Route exact path='/Profile' element={<Profile />} >
                    <Route path = 'YourFeed' element = {<YourFeed/>}/>
                    <Route path = 'Terribles' element = {<Terribles/>}/>
                    <Route path = 'Recommendations' element = {<Recommendations/>}/>
                    <Route path = 'Memories' element = {<Memories/>}/>
                </Route>
                
                <Route path='*' element={<NoMatch/>}/>
                
            </Routes>
            <ToastContainer />
        </>
    )
}
export default App;