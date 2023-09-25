import React from "react";
import FormModal from "./FormModal";

import zebraLogo from "../assets/images/zebra-logo.png"

import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function ZNavbar()
{

  //alert('Nav-No: ' + Math.random(1000));
  
  const showModal = React.useRef(false);
  const formModalKey = React.useRef(1);
  const [refresh, setRefresh] = React.useState(false);

  const handleShow= (e) =>{
    e && e.preventDefault();
    
    showModal.current = true;
    //alert("ShowModel::" + showModal.current);
    setRefresh(!refresh);
    
  }

  formModalKey.current = formModalKey.current + 1;

  return (
  <>
      <MDBNavbar expand='lg' light className="topBanner">
      <MDBContainer fluid style={{ padding: '3px' }}>
        <MDBNavbarBrand href='#' className="companyName">
          <img
            src={zebraLogo}
            className="logo"
            alt=''
            loading='lazy'
          /> <space/><space/>
          BLUE ZEBRA
        </MDBNavbarBrand>
        <MDBCollapse navbar >
          <MDBNavbarNav right fullWidth={false} className='mb-2 mb-lg-0'>
          <MDBNavbarItem>
            <MDBNavbarLink active aria-current='page' href='#' onClick={handleShow}>
              Suggestions
            </MDBNavbarLink>
          </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>

    {showModal.current && <FormModal showModal={true} key={formModalKey.current} 
      text="CEO's note: Zebra team is continually working on building the materials database with relevant contents. Please share your requirements and feedback to improve our service."></FormModal>}
  </>
  );

}



