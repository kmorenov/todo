import React, {Component, useState, useEffect} from 'react'

// export default function PhotoInfo({photo}) {
class PhotoInfo extends Component {

    state = {
        id: 0,
        albumId: '',
        title: '',
        thumbnailUrl: ''
    }
    // let obj = {}
    // const obj = {
    //     url : '',
    //     id : 5
    // }

    // const [id, setId] = useState(4);
    //
    componentDidMount() {
        return fetch(`https://jsonplaceholder.typicode.com/photos/${this.props.photo}`)
            .then((response) => response.json())
            // .then(response => console.log(response.id))
            .then(response =>
                this.setState({
                    id: response.id,
                    albumId: response.albumId,
                    title: response.title,
                    thumbnailUrl: response.thumbnailUrl
                }))

    }

    // console.log(id)
    // useEffect(() => {
    //     console.log(id)
    // });

    // return <div>Photo Info here {photo} Obj id: {b.id} </div>

    // obj.id = 93

    // return <div>Photo Info here {photo} ID: {obj.id}</div>

    render() {
        return <>
            <div className="container">
                <strong>ID: </strong> {this.state.id}
                <strong> Album ID: </strong> {this.state.albumId}
                <strong> Title: </strong> {this.state.title}
            </div>
            <div className="card m-1 w-25">
                <img src={this.state.thumbnailUrl} alt={this.state.title} className="card-img-top"/>
            </div>
            <button
                className="btn btn-primary"
                onClick={() => this.props.updateCounter(this.state)}
            >Buy
            </button>
        </>
    }
}
export default PhotoInfo