import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import PublicIcon from "@mui/icons-material/Public";
import StarsIcon from '@mui/icons-material/Stars';
import WorkIcon from '@mui/icons-material/Work';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <Link to="/">Home</Link>
          </div>
          <div className="sidebar-option">
            <p>PUBLIC</p>
            <div className="link">
              <div className="link-tag">
                <PublicIcon />
                <Link to="">Questions</Link>
              </div>
              <div className="tags">
                <p>Tags</p>
                <p>Users</p>
                <p>Companies</p>
              </div>
            </div>
          </div>
          <div className="sidebar-option">
            <Link to="/">COLLECTIVES</Link>
            <div className="link">
                <div className="link-tag">
                    <StarsIcon/>
                    <Link to="/">Explore Collectives</Link>
                </div>
            </div>
          </div>
          <div className="sidebar-option">
          <p>TEAMs</p>
          <div className="link-tag">
          <WorkIcon/>
          <Link to="/">Create free Team</Link>
          </div>
         
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
