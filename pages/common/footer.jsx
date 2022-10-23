import React, {BrowserRouter as Router} from "react";
import { Link } from "react-router-dom";
import Image from "next/image";
const Footer = () => {
  return (
    <div className="container-fluid main-footer">
      <div className="row col-foot-common">
        <div className="col-md-2 image-pan">
          <Image 
            src="/assets/images/AUK_BLF_Logo.jpg"
            alt="colchester breathe easy logo"
            width="239"
            height="239"
          />
        </div>
        <div className="col-md-8 text-pan">
          <div className="text-pan-text">
            <h3>Supporting People With Lung Conditions</h3>
            <div className="contact-us">
              <Image
                src="/assets/images/colchester-highwoods-com-centre.png"
                alt="colchester highwoods community centre"
                width="300"
                height="188"
              />
             <a className="btn btn-primary" href="/contactUs">
                Contact us &amp; where to find us
              </a>
            </div>
          </div>
        </div>


        <div className="col-md-2 image-pan">
          <div className="row">
            <div className="col-6 col-xs-12 external-links">
              <a
                href="https://www.facebook.com/groups/1965859146961536/"
                target="blank"
                className="sponsor-block"
              >
                <Image
                    src="/assets/images/fbook.png"
                    alt="book"
                    width="85"
                    height="85"
                />
              </a>
            </div>
            <div className="col-6 col-xs-12 external-links">
              <a href="/supporters" className="sponsor-block">
                <i className="fa fa-handshake-o fa-3x" aria-hidden="true"></i>

                <div className="sponsor-caption">Supporters</div>
              </a>
            </div>
            <div className="col-6 col-xs-12 external-links">
              <a href="/committee" className="sponsor-block">
                <i className="fa fa-users  fa-3x" aria-hidden="true"></i>
                <div className="sponsor-caption">
                  Committee
                  <br />
                  Volunteers
                </div>
              </a>
            </div>
            <div className="col-6 col-xs-12 external-links">
              <a href="/members" className="sponsor-block">
                <i className="fa fa-user fa-3x" aria-hidden="true"></i>

                <div className="sponsor-caption">Members</div>
              </a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Footer;
