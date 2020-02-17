import React from "react";
import AniLink from "gatsby-plugin-transition-link/AniLink";
import parse from "html-react-parser";
import Img from "gatsby-image";

const CaseStudiesPagination = props => {
  const { thumbnail, services, location, photography, featured, slug } = props;
  return (
    <div className="related">
      <div className="flex wrapper skinny">
        <div className="one-half">
          <div className="inner">
            <ul>
              {services && (
                <li className="flex">
                  <span className="left one-half">Services</span>
                  <span className="right one-half">{services}</span>
                </li>
              )}
              {location && (
                <li className="flex">
                  <span className="left one-half">Location</span>
                  <span className="right one-half">{location}</span>
                </li>
              )}
              {photography && (
                <li className="flex">
                  <span className="left one-half">Photography</span>
                  <span className="right one-half">{parse(photography)}</span>
                </li>
              )}
              {featured && (
                <li className="flex">
                  <span className="left one-half">Featured</span>
                  <span className="right one-half">{parse(featured)}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="one-half">
          <div className="inner flex">
            <div className={`col one-half`}>
              <AniLink
                preventScrollJump
                fade
                to={`/case-studies/${slug}`}
                className="next"
              >
                Next
              </AniLink>
            </div>
            <div className="col one-half">
              <AniLink
                preventScrollJump
                fade
                to={`/case-studies/${slug}`}
                className="next"
              >
                {thumbnail && <Img fluid={thumbnail} className="next-thumb" />}
              </AniLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudiesPagination;
