import React from 'react'
import {NavLink} from "react-router-dom";

export default function Photos({photos, updateCounter}) {
    return <div className="col-10">
        <h2>Photos</h2>
        <div className="row">
            {
                photos.map(photo => {
                    return <div className="card m-1 w-25">
                        {'Photo ID: ' + photo.id}
                        <NavLink to={"/photoinfo/" + photo.id} activeClassName="active"><img src={photo.thumbnailUrl} alt={photo.title} className="card-img-top" onClick={null}/></NavLink>
                        <div className="card-body text-center">
                            <button
                                className="btn btn-primary"
                                onClick={() => updateCounter(photo)}
                            >Buy
                            </button>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}


