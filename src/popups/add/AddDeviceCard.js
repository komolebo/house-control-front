import React, {Component} from 'react';
import './AddDeviceCard.css'

export const DeviceCard = function (click_cb, dev_data, checked, checkable) {
    return <div className={"scan-dev-card " + (checked ? "border-active" : "border-inactive")} onClick={() => click_cb ? click_cb(dev_data.id) : null}>
        {checkable ? 
            <div id="scan-checkbox-container">
                <img src={process.env.PUBLIC_URL + "Resources/checkbox_select_{state}.png".replace('{state}', checked ? "active" : "inactive")}/>
            </div>
        : null}

        <div className="scanned-dev-card-ico center-pos">
            <img src={process.env.PUBLIC_URL + dev_data.png.replace('.png',(checked ? "_active.png" : ".png"))}/>
        </div>
        <div className={"dev-name-under-ico " + (checked ? "select-col" : "")}>
            {dev_data.name}
        </div>
    </div>
}