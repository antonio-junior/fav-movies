import React from 'react'

import Header from '../layout/header'
import SideBar from '../layout/sidebar'
import Header from '../layout/footer'

export default props => (
    <div className='wrapper'>
        <Header />
        <SideBar />
        <div className='content-wrapper'> 
            {props.children}
        </div>
        <Footer />
    </div>
)