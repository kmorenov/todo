import React from 'react'
import PropTypes from 'prop-types'

// export default function Albums(props, getPhotos) {
class Albums extends React.Component {

    static propTypes = {
        albums: PropTypes.array.isRequired
    }

    render() {
        return (<div className="col-2">
            <h2>Albums</h2>
            {this.props.albums.map(album => {
                return <a href="#"//{`https://jsonplaceholder.typicode.com/albums?userId=${props.album}`}
                          className={'list-group-item list-group-item-action '}
                          onClick={() => this.props.getAlbumPhotos(album)}
                >
                    {album}
                </a>
            })}
        </div>)
    }
}
Albums.propTypes = {
    albums: PropTypes.array
}


export default Albums;
